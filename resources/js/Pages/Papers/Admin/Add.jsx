import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaperForm from './Partials/PaperForm';


export default function Add({auth}) {
    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Paper</h2>}
        >
            <head title={'Add Paper'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <PaperForm auth = {auth} paper={null} className="max-w-xl"></PaperForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}