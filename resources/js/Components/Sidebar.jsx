import React from "react";
import summary from "@/Components/summaryIcon.png";
import studentIcon from "@/Components/studentIcon.png";
import paperIcon from "@/Components/paperIcon.png"; // Existing paper icon
import roleIcon from "@/Components/roleIcon.png"; // Import for the new icon
import { Link } from "@inertiajs/react";

export default function Sidebar({ user }) {
  // Define menu items for the admin role
  const adminMenuItems = [
    {
      id: "dashboard",
      route: "admindashboard",
      icon: summary,
      label: "Dashboard",
    },
    { id: "papers", route: "papers.index", icon: paperIcon, label: "Papers" },
    {
      id: "students",
      route: "student.view",
      icon: studentIcon,
      label: "Students",
    },
    {
      id: "roles",
      route: "assistant-admins.view", // Updated route for roles
      icon: roleIcon,
      label: "Roles", // Updated label for clarity
    },
  ];

  // Only show the "Papers" link if the user is an assistant-admin
  const menuItems =
    user?.role === "assistant-admin"
      ? [
          {
            id: "papers",
            route: "papers.index",
            icon: paperIcon,
            label: "Papers",
          },
        ] // Only Papers for assistant-admin
      : adminMenuItems; // Show all items for admins

      console.log(user)
      console.log(menuItems)

  return (
    <div className="w-15 h-auto bg-[#b2022f] text-white p-2">
      <ul className="space-y-15">
        {menuItems.map((item) => (
          <li key={item.id} className="mt-10 text-center text-xs">
            <Link
              href={route(item.route)}
              className="flex flex-col items-center p-2 rounded-md hover:bg-red-800 hover:shadow-md hover:text-[#ffffff]"
            >
              {/* Display the icon with adjusted size */}
              <img
                src={item.icon}
                alt={`${item.label} Icon`}
                className="w-7 h-7" // Adjusted icon size
              />
              {/* Display the label */}
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
``;
