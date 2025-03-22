// import { useState, useCallback } from "react";
// import { MdOutlineTune } from "react-icons/md";
// import { BsList } from "react-icons/bs";
// import { cn } from "../lib/utils";
// import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
// import { ProfilePicture } from "./avatar";
// import DatatableSearchInput from "./data-search-input";
// import { Button } from "@/components/ui/button";

// export default function Header() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
//   const sidebarToggle = () => {
//     invokeToggleCollapse();
//   };

//   const handleSearchChange = useCallback((value: string | number) => {
//     const searchValue = value.toString();
//     // console.log("Searching for:", searchValue);
//     setSearchTerm(searchValue);

//     // TODO: Trigger API call or filter table data
//   }, []);
//   const headerStyle = cn(
//     "fixed top-0 z-10 border-b bg-white backdrop-blur transition-all duration-300 ease-in-out rounded-xl shadow-sm",
//     {
//       // "sm:left-[21rem] w-full left-0 md:w-[calc(100%-20rem-2rem)]": !toggleCollapse, // Sidebar expanded
//       // "sm:left-[6.4rem] w-full left-0 md:w-[calc(100%-5.4rem-2rem)]":
//       // 	toggleCollapse, // Sidebar collapsed
//     }
//   );

//   return (
//     <header className={headerStyle}>
//       <div className="flex h-16 items-center">
//         <button
//           type="button"
//           onClick={sidebarToggle}
//           aria-label="sidebar"
//           className="shrink-btn text-sidebar-muted-foreground order-2 float-right mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-md shadow-md transition duration-300 ease-in-out sm:order-1 sm:hidden"
//         >
//           <BsList />
//         </button>
//         <div className="order-1 flex w-full items-center gap-5 px-2 sm:order-2 md:justify-between md:gap-10">
//           <div className="flex flex-none items-center gap-2">
//             <ProfilePicture />
//             {/* <p className="hidden text-gray-700 sm:flex">Olowosuyi Temitope</p> */}
//           </div>
//           <div className="rounded-md border border-gray-300 md:flex-1">
//             <DatatableSearchInput
//               value={searchTerm}
//               onChange={handleSearchChange}
//               debounce={500}
//               placeholder="Search..."
//               className="border-0"
//             />
//           </div>

//           <div className="flex flex-none items-center gap-2">
//             <p className="text-gray-700">Filter</p>
//             <MdOutlineTune size={20} />
//           </div>
//           <Button className="hidden flex-none rounded-3xl sm:flex">
//             Create project
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// import classNames from "classnames";
// import { IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
// import SideBarMenuGroup from "@/components/sidebar/sidebar-menu-group";
// import SIDENAV_ITEMS from "@/routes/menu-list";
// import { cn } from "@/lib/utils";
// import { SideNavItem } from "@/types/sidenav-item";

// function SideBar() {
//   const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();

//   const sidebarToggle = () => {
//     invokeToggleCollapse();
//   };

//   const asideStyle = classNames(
//     "bg-white fixed top-0 bottom-0 left-0 text-white border rounded-xl transition-all duration-300 ease-in-out z-[50] overflow-y-auto",
//     {
//       "w-[20rem]": !toggleCollapse, // Expanded with left margin
//       "w-[5.4rem] sm:left-0 left-[-100%]": toggleCollapse, // Collapsed with left margin
//     }
//   );

//   return (
//     <aside className={asideStyle}>
//       <button
//         type="button"
//         onClick={sidebarToggle}
//         aria-label="sidebar-toggle"
//         className="absolute right-0 top-3 -mt-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-100 ease-in-out"
//       >
//         {toggleCollapse ? (
//           <IoArrowForward size={20} />
//         ) : (
//           <IoArrowBack size={20} />
//         )}
//       </button>

//       <nav
//         className={cn(
//           "flex flex-col gap-2 text-black transition-all duration-300 ease-in-out dark:text-white"
//         )}
//       >
//         <div className="flex flex-col gap-5 px-4 pt-10">
//           {SIDENAV_ITEMS.map((item: SideNavItem) => (
//             <SideBarMenuGroup key={item.title} menuGroup={item} />
//           ))}
//         </div>
//       </nav>
//     </aside>
//   );
// }

// export default SideBar;

// import { ReactNode } from "react";
// import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
// import { cn } from "@/lib/utils";

// export default function PageWrapper({ children }: { children: ReactNode }) {
//   const { toggleCollapse } = useSideBarToggle();
//   const bodyStyle = cn(
//     "mt-20 ml-1 h-full overflow-y-auto mb-5 transition-all duration-300 ease-in-out",
//     {
//       "sm:pl-[20rem]": !toggleCollapse,
//       "sm:pl-[6.4rem]": toggleCollapse,
//       "md:pl-[21rem] md:pr-5": !toggleCollapse,
//       "md:pl-[6.5rem] md:pr-4": toggleCollapse,
//     }
//   );

//   return <div className={bodyStyle}>{children}</div>;
// }
