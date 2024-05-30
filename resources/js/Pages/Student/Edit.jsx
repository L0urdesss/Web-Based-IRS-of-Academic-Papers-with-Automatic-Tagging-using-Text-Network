import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StudentForm from './Partials/StudentForm';


export default function Edit({ auth, student }) {
    console.log(student)
    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student #{student.id}</h2>}
        >
            <Head title={'Student #' + student.id} />

            <div className="py-12">

                        <div className="w-full"> {/* Change the max-width here */}
                            <StudentForm student={student}></StudentForm>
                        </div>

            </div>
        </AuthenticatedLayout>
    );
}
