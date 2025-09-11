// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

// import {
//   LayoutDashboard,
//   Package,
//   Settings,
//   UserRoundSearch,
// } from "lucide-react";
// import SidebarItem from "../helper/SidebarItem";

// const AdminLayout = () => {
//   const [activeItem, setActiveItem] = useState("Dashboard");

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 border-r bg-white p-4 flex flex-col">
//         {/* Logo / Heading Section */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2">
//             <LayoutDashboard
//               className="text-white bg-blue-600 p-2 rounded-lg h-9 w-9 "
//               size={2}
//             />
//             <h1 className="text-2xl font-bold text-gray-800">AdminPanel</h1>
//           </div>
//           <Separator className="my-8 w-full" />
//         </div>

//         <nav className="flex-1 space-y-1">
//           <SidebarItem
//             icon={<LayoutDashboard />}
//             label="Dashboard"
//             path="/admin/dashboard"
//             activeItem={activeItem}
//             setActiveItem={setActiveItem}
//           />

//           <SidebarItem
//             icon={<Package />}
//             label="Programs"
//             path="/admin/programs"
//             activeItem={activeItem}
//             setActiveItem={setActiveItem}
//           />

//           <SidebarItem
//             icon={<UserRoundSearch />}
//             label="Users"
//             path="/admin/users"
//             activeItem={activeItem}
//             setActiveItem={setActiveItem}
//           />

//           <SidebarItem
//             icon={<Settings />}
//             label="Settings"
//             path="/admin/settings"
//             activeItem={activeItem}
//             setActiveItem={setActiveItem}
//           />
//           {/* <SidebarItem
//             icon={<LogOut />}
//             label="Logout"
//             onClick={handleLogout}
//             activeItem={activeItem}
//             setActiveItem={setActiveItem}
//           /> */}
//         </nav>

//         <div className="mt-auto">
//           <Separator className="my-4 w-full" />
//           <div className="flex items-center gap-3 px-2 py-3">
//             <Avatar className="h-9 w-9">
//               <AvatarImage src={"/placeholder.svg"} alt="Profile" />
//               <AvatarFallback>MK</AvatarFallback>
//             </Avatar>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">Mahesh</p>
//               <p className="text-xs text-gray-500 ">mahesh@gmail.com</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  Settings,
  UserRoundSearch,
  Menu,
  X,
} from "lucide-react";
import SidebarItem from "../helper/SidebarItem";

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar only on mobile
  const handleSidebarClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out 
        md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Heading Section */}
        <div className="p-4 mb-8">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-white bg-blue-600 p-2 rounded-lg h-9 w-9" />
            <h1 className="text-2xl font-bold text-gray-800">AdminPanel</h1>
          </div>
          <Separator className="my-8 w-full" />
        </div>

        <nav className="flex-1 space-y-1 px-4">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            path="/admin/dashboard"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={handleSidebarClick}
          />
          <SidebarItem
            icon={<Package />}
            label="Programs"
            path="/admin/programs"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={handleSidebarClick}
          />
          <SidebarItem
            icon={<UserRoundSearch />}
            label="Users"
            path="/admin/users"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={handleSidebarClick}
          />
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            path="/admin/settings"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={handleSidebarClick}
          />
        </nav>

        {/* Footer / Profile Section */}
        <div className="mt-72 p-4">
          <Separator className="my-4 w-full" />
          <div className="flex items-center gap-3 px-2 py-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={"/placeholder.svg"} alt="Profile" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Mahesh</p>
              <p className="text-xs text-gray-500">mahesh@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar for mobile/tablet */}
        <header className="flex items-center justify-between bg-white border-b px-4 py-3 md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <h2 className="text-lg font-semibold">AdminPanel</h2>
          <Avatar className="h-8 w-8">
            <AvatarImage src={"/placeholder.svg"} alt="Profile" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
