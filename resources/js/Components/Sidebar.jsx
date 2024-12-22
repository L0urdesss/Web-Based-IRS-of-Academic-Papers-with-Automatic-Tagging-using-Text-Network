import React from 'react';
import summary from '@/Components/summaryIcon.png';
import studentIcon from '@/Components/studentIcon.png';
import paperIcon from '@/Components/paperIcon.png';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    // Define menu items with their respective icons and labels
    const menuItems = [
        { id: 'dashboard', route: 'admindashboard', icon: summary, label: 'Dashboard' },
        { id: 'papers', route: 'papers.index', icon: paperIcon, label: 'Papers' },
        { id: 'students', route: 'student.view', icon: studentIcon, label: 'Students' },
    ];

    return (
        <div className="w-15 h-auto bg-[#b2022f] text-white p-2 ">
            <ul className="space-y-15">
                {menuItems.map((item) => (
                    <li key={item.id} className="mt-10 text-center text-xs">
                        <Link
                            href={route(item.route)}
                            className="flex flex-col items-center  p-2 rounded-md hover:bg-red-800 hover:shadow-md hover:text-[#ffffff]"
                        >
                            {/* Display the icon with adjusted size */}
                            <img
                                src={item.icon}
                                alt={`${item.label} Icon`}
                                className="w-6 h-7" // Adjusted icon size
                            />
                            {/* Display the label */}
                            <span className="whitespace-nowrap">
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
