// Dashboard.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import pictureLogin from '../../../resources/js/Components/picture_login.png';
import Searchbar from '../Components/Searchbar'; // Import the Searchbar component
import '../../../resources/css/Scrollbar.css';
import NavLink from '@/Components/NavLink';

export default function AdminDashboard({ auth }) {
    const handleSearch = (searchTerm, filters) => {
        window.location = route('userpapers.view', {
            searchQuery: searchTerm ,
            filters: filters
        });
      };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                    <div className="sm:w-1/2 p-6 text-gray-900">
                        <blockquote className="text-lg font-semibold italic">
                            <span style={{ color: '#831b1c', fontWeight: 'bold', fontSize: '5.5em' }}>TUP</span><br></br><br></br>
                            <span style={{ color: '#831b1c', fontWeight: 'bold', fontSize: '5.5em' }}>CORNER</span><br></br> 
                        </blockquote>
                    </div>
                </div>
                <div className="mt-8">
                <div className="relative flex justify-center items-center mx-auto w-3/4">

                </div>
                </div>

                <div className="sm:flex-row items-center justify-between">
                <NavLink href={route('papers.index')} active={route().current('papers*')} style={{ color: '#831b1c'}}>
                    Modify Research Paper
                </NavLink>
                <NavLink href={route('userrequest.index')} active={route().current('userrequest*')} style={{ color: '#831b1c'}}>
                    Modify Request Paper
                </NavLink>                
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
