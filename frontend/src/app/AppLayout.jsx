import { Outlet } from "react-router"
import Nav from "../shared/components/Nav"

const AppLayout = () => {
  return (
    <div className="w-full h-screen bg-[#ebe9e3] text-gray-900">
        <Nav/>
        <Outlet/>
    </div>
  )
}

export default AppLayout