'use client'
import { useForm } from "react-hook-form";
import { findItemByID, updateItem } from "../actions/item.action";
import UpdateIcon from "./icons/UpdateIcon";
import { IItem } from "../types/item.type";

interface IID {
  id: string | undefined;
}

const UpdateModal = (props: IID) => {
  const {id} = props;

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
  } = useForm();

  const onOpenForm = async () => {
    (document.getElementById(`update_item_modal-${id}`) as HTMLDialogElement)?.showModal();
    const item = (await findItemByID(id)).message as string;
    const jsonItem = JSON.parse(item);
    setValue('item', jsonItem.name);
    setValue('description', jsonItem.description);
    setValue('amount', jsonItem.amount);
  }

  const onUpdate = async () => {
    const values = getValues();
    const updateData: IItem = {
      name: values.item,
      description: values.description,
      amount: values.amount,
    }
    await updateItem(id, updateData);
  }

  const onCloseForm = async () => reset();

  return (
    <>
      <button className="btn btn-secondary btn-sm btn-square btn-outline" onClick={onOpenForm}>
        <UpdateIcon />
      </button>
      <dialog id={`update_item_modal-${id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseForm}>✕</button>
          </form>
          <span className="w-full flex justify-center">
            <h3 className="font-bold text-lg">Update Item</h3>
          </span>
          <form onSubmit={handleSubmit(onUpdate)} className="flex-col w-full mt-4">
            <input {...register('item', {required: 'item is required'})} type="text" name="item" placeholder="Enter budget item" className="input input-bordered w-full max-w-lg" />
            <input {...register('description', {required: 'description is required'})} type="text" name="description" placeholder="Enter budget item description" className="input input-bordered w-full max-w-lg mt-2" />
            <input {...register('amount', {required: 'amount is required'})} type="text" name="amount" placeholder="Enter item amount" className="input input-bordered w-full max-w-lg mt-2" />
            <button type="submit" className="btn btn-square btn-success btn-outline w-full mt-2">Update</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default UpdateModal;

