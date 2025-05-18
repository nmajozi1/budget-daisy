'use client'
import { deleteIncomeItem } from '../actions/income.action'
import CloseIcon from './icons/CloseIcon'

interface IID {
  id: string | undefined
}

const DeleteIncomeItemModal = (props: IID) => {
  const {id} = props;
  const onDeleteItem = async () => await deleteIncomeItem(id);

  return (
    <button className="btn btn-error btn-sm btn-square btn-outline" onClick={onDeleteItem}>
      <CloseIcon />
    </button>
  )
}

export default DeleteIncomeItemModal  