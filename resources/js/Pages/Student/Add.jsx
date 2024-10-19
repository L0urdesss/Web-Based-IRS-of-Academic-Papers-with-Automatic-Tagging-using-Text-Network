import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StudentForm from './Partials/StudentForm';


export default function Add({auth}) {
    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Student</h2>}
        >
            <head title={'Add Student'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <StudentForm auth = {auth} student={null} className="max-w-xl"></StudentForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}