import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

// Import your logo image
import logoImg from '@/Components/logo.png';

// Import GuestLayout component
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-4 sm:pt-0 bg-white-00">
                <div className="w-full sm:max-w-md px-8 py-8 bg-white overflow-hidden shadow-md self-end sm:mr-20 border border-gray-400">
                    {/* Image and text added inside the container */}
                    <div className="text-center">
                        <img src={logoImg} alt="Logo" className="w-64 mx-auto" />
                        <p className="mt-4 text-gray-600 text-sm">
                            Welcome to TUP Corner, where your academic journey takes center stage. Explore, discover, and excel in your research endeavors!
                        </p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <PrimaryButton className="w-full" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>

                        <div className="mt-2 text-center text-sm text-gray-700">
                            Not yet verified? <a href="#" className="text-red-500">Verify here</a>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
