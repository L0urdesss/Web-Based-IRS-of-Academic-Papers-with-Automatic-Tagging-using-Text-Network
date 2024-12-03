import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import '../../../resources/css/Scrollbar.css';
import { Link } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="flex">
                {/* Left Panel */}
                <div className="w-1/4 h-screen bg-red-800 text-white p-4">
                    <ul>
                        <li className="mb-2"><Link href={route('papers.index')} className="text-white hover:text-white">Papers</Link></li>
                        <li className="mb-2"><Link href={route('userrequest.index')} className="text-white hover:text-white">Paper Req</Link></li>
                        <li><Link href={route('student.view')} className="text-white hover:text-white">Students</Link></li>
                        
                    </ul>
                </div>

                {/* Main Content (Empty) */}
                <div className="w-3/4 h-auto"></div>
            </div>
        </AuthenticatedLayout>
    );
}
