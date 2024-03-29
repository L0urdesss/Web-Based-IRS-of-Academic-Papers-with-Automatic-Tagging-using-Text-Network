// Dashboard.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import pictureLogin from '../../../resources/js/Components/picture_login.png';
import Searchbar from '../../../resources/js/Components/Searchbar'; // Import the Searchbar component
import './Scrollbar.css';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                    <div className="sm:w-1/2 p-6 text-gray-900">
                        <blockquote className="text-lg font-semibold italic">
                            <span style={{ color: '#831b1c', fontWeight: 'bold', fontSize: '5.5em' }}>PUTO</span><br></br><br></br>
                            <span style={{ color: '#831b1c', fontWeight: 'bold', fontSize: '5.5em' }}>CORNER</span><br></br> 
                            <span style={{ color: '#af2429' }}>A research engine, steaming with knowledge for students' academic journey.</span>
                        </blockquote>
                    </div>
                    <div className="w-full sm:w-auto p-6 flex justify-center sm:justify-between flex-col items-center">
                        <img src={pictureLogin} alt="Login Picture" className="max-w-full h-auto" />
                    </div>
                </div>
                <div className="mt-8">
                    <Searchbar />
                </div>
                <div className="mt-9" style={{ marginLeft: '20px', marginRight: '20px' }}> {/* Added marginLeft and marginRight style */}
                    <h2 className="text-xl font-semibold" style={{ color: '#831b1c', textAlign: 'center' }}>Recently Viewed Research Paper</h2>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
