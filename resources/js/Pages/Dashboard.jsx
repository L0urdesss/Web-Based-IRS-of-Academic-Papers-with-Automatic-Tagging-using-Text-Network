import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Searchbar from '../../../resources/js/Components/Searchbar'; // Import the Searchbar component
import '../../../resources/css/Scrollbar.css';
import page1 from '@/Components/page1.png'; // Importing the logo image
import page2 from '@/Components/page2.png'; // Importing the logo image

const Dashboard = ({ auth }) => {
    const handleSearch = (searchTerm, filters) => {
        const url = route('userpapers.view');
        const data = {
            searchQuery: searchTerm,
        };

        router.get(url, data);notenote
    };
        console.log("in dash ",auth)
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
                </div>  
        
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;