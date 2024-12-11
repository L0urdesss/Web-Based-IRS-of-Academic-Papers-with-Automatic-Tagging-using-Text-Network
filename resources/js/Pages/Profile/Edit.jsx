import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Flex container with gap */}
                    <div className="flex flex-wrap md:flex-nowrap gap-6">
                        {/* Add consistent height and ensure both boxes use equal width */}
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg md:w-1/2 flex-grow flex flex-col">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg md:w-1/2 flex-grow flex flex-col">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
