'use server'
import { revalidatePath } from "next/cache";
import ItemModel from "../db/items.model"
import { IItem, IItemPaidUpdate, ItemFormState } from "../types/item.type";
import { cookies } from "next/headers";
import { AddItemSchema } from "../lib/definitions";

const createItem = async (itemData: IItem) => {
  try {
    const item = new ItemModel(itemData);
    await item.save({new: true});
    revalidatePath('/home');
    return {success: true, item};
  } catch (error) {
    return {success: false, message: error}
  }
};

export const addItem = async (state: ItemFormState, formData: FormData) => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('id');

  const validateItem = AddItemSchema.safeParse({
    item: formData.get('item'),
    description: formData.get('description'),
    amount: Number(formData.get('amount')),
  });

  if (validateItem.success) {
    await createItem({
      name: validateItem.data.item, 
      amount: validateItem.data.amount, 
      description: validateItem.data.description, 
      userId: userCookie?.value as string,
      paid: true,
    });
  }

  return { success: false, message: 'failed to update budget item', open: false, error: validateItem?.error?.flatten().fieldErrors };

};

export const listItemsPerUser = async (userId: string | undefined) => {
  try {
    const items: IItem [] = await ItemModel.find({userId});
    return {success: true, items};
  } catch (error) {
    return {success: false, message: error};
  }
} 

export const updateItem = async (id: string | undefined, itemData: IItem | IItemPaidUpdate) => {
  try {
    if (id) {
      const item = await ItemModel.findByIdAndUpdate(id, itemData, { new: true });
      revalidatePath('/home');
      return { success: true, message: JSON.stringify(item)};
    }
    return { success: false, message: 'invalid ID number' };
  } catch (error) {
    return {success: false, message: error};
  }
}

export const deleteItem = async (itemId: string | undefined) => {
  try {
    await ItemModel.findByIdAndDelete(itemId);
    revalidatePath('/home');
    return {success: true};
  } catch (error) {
    return {success: false, message: error};
  }
}

export const findItemByID = async (itemID: string | undefined) => {
  try {
    const item: IItem | null = await ItemModel.findById(itemID);
    return {success: true, message: JSON.stringify(item)};
  } catch (error) {
    return {success: false, message: error};
  }
}
