import { redirect } from "next/navigation";

export default function Home() {
  redirect('/login');
  
  return (
    <div>
      <h1>SERVER SIDE HOME!</h1>
    </div>
  );
}
