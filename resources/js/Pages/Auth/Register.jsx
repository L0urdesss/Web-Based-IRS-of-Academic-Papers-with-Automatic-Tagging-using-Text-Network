import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import logoImg from '@/Components/logo.png';
import loginPic from '@/Components/verify.png';
import registerBg from '@/Components/loginbg.png';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${registerBg})` }}
        >
            <GuestLayout>
                <Head title="Register" />
                <div className="flex items-center justify-center py-5 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-center w-full max-w-6xl mx-auto">
                        {/* Image Section */}
                        <div className="w-full sm:w-1/2 flex justify-center p-4">
                            <img src={loginPic} alt="Registration Illustration" className="w-3/4 h-auto" />
                        </div>

                        {/* Form Section */}
                        <div className="w-full sm:w-1/2 max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
                            <div className="text-center">
                                <img src={logoImg} alt="TUP Corner Logo" className="w-48 mx-auto" />
                                <p className="mt-4 text-gray-600 text-sm">
                                    Welcome to TUP Corner, where your academic journey takes center stage. Explore, discover, and excel in your research endeavors!
                                </p>
                            </div>
                            <form onSubmit={submit}>
                                {/* Email Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Password Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Password Confirmation Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col items-center justify-end mt-5">
                                    <Link
                                        href={route('login')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Already registered?
                                    </Link>
                                    <PrimaryButton className="mt-5" disabled={processing}>
                                        Register
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </div>
    );
}
