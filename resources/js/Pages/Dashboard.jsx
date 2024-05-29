import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Searchbar from '../../../resources/js/Components/Searchbar'; // Import the Searchbar component
import '../../../resources/css/Scrollbar.css';
import page1 from '@/Components/page1.png'; // Importing the logo image
import page2 from '@/Components/page2.png'; // Importing the logo image
import page3 from '@/Components/page3.png'; // Importing the logo image
import page4 from '@/Components/page4.png'; // Importing the logo image

const Dashboard = ({ auth }) => {
    const handleSearch = (searchTerm, filters) => {
        window.location = route('userpapers.view', {
            searchQuery: searchTerm,
            filters: filters
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="bg-white">
                <div className="">
                    {/* Render page1, page2, and page3 in full width vertically */}
                    <div className="flex flex-col items-center justify-center w-full sm:w-auto mb-8 sm:mb-0 relative">
                        <img src={page1} alt="Page 1" className="w-full" />
                        <div className="absolute right-1/5 mt-20 w-3/4">

                            <Searchbar onSearch={handleSearch} />
                        </div>
                    </div>
                    <img src={page2} alt="Page 2" className="w-full" />
                    <img src={page3} alt="Page 3" className="w-full mt-20" />
                </div>
  
                <img src={page4} alt="Page 4" className="w-full" />
                    {/* Removed the blockquote content */}
        
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
