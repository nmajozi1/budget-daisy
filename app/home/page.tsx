import { cookies } from 'next/headers';
import { listItemsPerUser } from '../actions/item.action';
import { findUserById } from '../actions/user.action';
import { listIncome } from '../actions/income.action';
import TableTab from '../components/TableTab';

const page = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('id');

  const userId = userCookie?.value;

  const items = (await listItemsPerUser(userId)).items;
  const income = (await listIncome())?.income;
  const user = await findUserById(userId);

  return (
    <TableTab incomeData={JSON.stringify(income)} itemsData={JSON.stringify(items)} userData={JSON.stringify(user.message)} />
  )
}

export default page;