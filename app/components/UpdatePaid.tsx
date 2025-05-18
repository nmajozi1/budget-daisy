import { updateItem } from "../actions/item.action";

type IItemId = {
  id: string | undefined;
  paid: boolean | undefined;
}

const UpdatePaid = (props: IItemId) => {
  const { id, paid } = props;

  const onStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ARE WE EVEN MAKING IT HERE.');
    await updateItem(id, { paid: event.target?.checked })
  };

  return <input type="checkbox" className="toggle" checked={paid} onChange={onStatusChange} />
}

export default UpdatePaid