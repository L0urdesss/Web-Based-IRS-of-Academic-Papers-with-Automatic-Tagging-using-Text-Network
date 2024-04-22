import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaperDetails from './Partials/PaperDetails';

export default function Preview({ auth, paper ,success}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Paper #{paper.id}</h2>}
            className="w-full" // Add className="w-full" to the AuthenticatedLayout component
        > 
            <head title={'Paper #' + paper.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PaperDetails paper={paper} user={auth.user} success={success}></PaperDetails>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
