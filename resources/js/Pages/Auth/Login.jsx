import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

// Import your images
import logoImg from '@/Components/logo2.png';
import loginBg from '@/Components/loginbg.png';

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
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <GuestLayout>
                <Head title="Log in" />
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex flex-col sm:flex-row items-center">
                        <div className="mt-10 w-full sm:max-w-md px-8 py-8 bg-white overflow-hidden shadow-md border border-gray-400 rounded-md">
                            <div className="text-center">
                                <img src={logoImg} alt="Logo" className="w-64 mx-auto" />
                                <p className="mt-4 text-gray-600 text-sm">
                                    Welcome to TUP Scholarly, where your academic journey takes center stage. Explore, discover, and excel in your research endeavors!
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
                                    Not yet registered? <Link href={route('register')} className="text-red-500">Register here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </div>
    );
}
