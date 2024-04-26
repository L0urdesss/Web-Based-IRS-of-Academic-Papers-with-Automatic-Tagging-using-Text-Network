import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaperDetails from './Partials/PaperDetails';

export default function Preview({ auth, paper ,success}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        > 
            <Head title={'Paper'} /> {/* Removed paper.id from here */}

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PaperDetails paper={paper} user={auth.user} success={success}></PaperDetails>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
