import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import logo from '@/Components/logo.png'; // Importing the logo image
import modifyIcon from '../../../resources/js/Components/modify.png'; // Importing modify icon
import requestIcon from '../../../resources/js/Components/request.png'; // Importing request icon
import '../../../resources/css/Scrollbar.css';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'

export default function AdminDashboard({ auth }) {
    const handleSearch = (searchTerm, filters) => {
        window.location = route('userpapers.view', {
            searchQuery: searchTerm,
            filters: filters
        });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between mb-10 mt-3 ">
                     <img src={logo} alt="Logo" className="h-auto w-64 mx-auto" /> {/* Adjusted width */}
                </div>
                <div className="mt-8">
                    <div className="relative flex justify-center items-center mx-auto w-full">
                        {/* Content related to Searchbar or any other components */}
                    </div>
                </div>

                <div className="flex justify-center items-center mx-auto w-1/2"> {/* Adjusted width to center the icons */}
                    <div style={{ marginRight: '20px' }}>
                        <a href={route('papers.index')} style={{ color: '#831b1c'}}>
                            <img src={modifyIcon} alt="Modify Research Paper" style={{ width: '100%', height: '100%' }}/>
                        </a>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <a href={route('userrequest.index')} style={{ color: '#831b1c'}}>
                            <img src={requestIcon} alt="Modify Request Paper" style={{ width: '100%', height: '100%' }} />
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
