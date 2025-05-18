'use client'

import { logout } from "../actions/user.action";
import LogoutIcon from "./icons/LogoutIcon";

type THeader = {
  header: string;
  name: string | undefined;
  surname: string | undefined;
};

const Header = (props: THeader) => {
  const {header, name, surname} = props;

  const onLogout = () => logout();
  // const onListUsers = () => listUsers();

  return (
    <div className="flex justify-between h-16 w-full border-b-2 border-b-slate-700 mb-8">
      <div>
        <p className="text-3xl text-slate-700">Lookho - {header}</p>
        <p className="text-sm text-center text-slate-700">{`${name} ${surname}` }</p>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-secondary btn-outline" onClick={onLogout}><LogoutIcon />Logout</button>
        {/* <button className="btn btn-secondary btn-outline" onClick={onListUsers}>List Users</button> */}
      </div>
    </div>
  )
}

export default Header