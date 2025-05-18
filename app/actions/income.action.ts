'use server'

import { cookies } from "next/headers";
import IncomeModel from "../db/income.model";
import { AddItemSchema } from "../lib/definitions";
import { IItem, IncomeFormState } from "../types/item.type";
import { revalidatePath } from "next/cache";

const createItem = async (itemData: IItem) => {
  try {
    const item = new IncomeModel(itemData);
    await item.save(itemData);
    revalidatePath('/home');
    return {success: true, item};
  } catch (error) {
    return {success: false, message: error}
  }
};

export const createIncome = async (state: IncomeFormState, formData: FormData) => {
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
      description: validateItem.data.description,
      amount: validateItem.data.amount,
      userId: userCookie?.value as string,
    });
  }

  return { success: false, message: 'failed to update the income item', open: false, error: validateItem?.error?.flatten().fieldErrors };
};

export const listIncome = async () => {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('id');

    const income: IItem [] | null= await IncomeModel.find({userId: userCookie?.value});
  
    if (income) return { success: true, income }
  
  } catch (error) {
    console.log(error);
    return { success: false, income: null }
  }
}

export const updateIncomeItem = async (id: string | undefined, itemData: IItem) => {
  try {
    if (id) {
      const item = await IncomeModel.findByIdAndUpdate(id, itemData, { new: true });
      revalidatePath('/home');
      return { success: true, message: JSON.stringify(item)};
    }
    return { success: false, message: 'invalid ID number' };
  } catch (error) {
    return {success: false, message: error};
  }
}

export const findIncomeItemByID = async (itemID: string | undefined) => {
  try {
    const item: IItem | null = await IncomeModel.findById(itemID);
    return {success: true, message: JSON.stringify(item)};
  } catch (error) {
    return {success: false, message: error};
  }
}

export const deleteIncomeItem = async (itemId: string | undefined) => {
  try {
    await IncomeModel.findByIdAndDelete(itemId);
    revalidatePath('/home');
    return {success: true};
  } catch (error) {
    return {success: false, message: error};
  }
}