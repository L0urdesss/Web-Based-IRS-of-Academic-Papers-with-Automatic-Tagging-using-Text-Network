import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PaperForm from './Partials/PaperForm';


export default function Edit({ auth, paper }) {

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Paper #{paper.id}</h2>}
        >
            <Head title={'Paper #' + paper.id} ></Head>

            <div className="py-12">
            <Link replace href="/papers-admin"  className="float-end">Back</Link>

                        <div className="w-full"> {/* Change the max-width here */}
                            <PaperForm paper={paper}></PaperForm>
                        </div>

            </div>
        </AuthenticatedLayout>
    );
}
