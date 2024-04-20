import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaperDetails from './Partials/PaperDetails';


export default function Preview({auth ,paper}) {
    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Paper #{paper.id}</h2>}
        >
            <head title={'Paper #'+ paper.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <PaperDetails paper={paper} className="max-w-xl"></PaperDetails>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}