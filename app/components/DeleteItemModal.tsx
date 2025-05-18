'use client'
import { deleteItem } from '../actions/item.action'
import CloseIcon from './icons/CloseIcon'

interface IID {
  id: string | undefined
}

const DeleteItemModal = (props: IID) => {
  const {id} = props;
  const onDeleteItem = async () => await deleteItem(id);

  return (
    <button className="btn btn-error btn-sm btn-square btn-outline" onClick={onDeleteItem}>
      <CloseIcon />
    </button>
  )
}

export default DeleteItemModal  