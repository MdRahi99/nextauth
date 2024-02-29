'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import AuthImage from '../../../components/AuthImage/AuthImage';
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";

const SignIn = () => {

    const { signIn, loading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>("");

    // Handle User Creation
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await signIn(formData.email, formData.password);
            router.push('/')
        } catch (error: any) {
            console.error('Error signing in:', error);
            setError(
                error.message || "Failed to sign in. Please check your credentials and try again."
            );
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col lg:flex-row items-center justify-between h-screen'>
            <div className='w-full lg:w-7/12'>
                <AuthImage />
            </div>

            <div className='w-full lg:w-5/12 h-screen p-10 lg:p-16 flex flex-col justify-center gap-3'>
                <h1 className='text-3xl font-bold'>Welcome Back!</h1>
                <p>Login to your account</p>
                <form className='' onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <h1 className='text-gray-500 font-medium'>
                            Email
                        </h1>
                        <div className="mt-3">
                            <input
                                type="email"
                                name="email"
                                className='input p-4 bg-gray-200 focus:outline-none w-full rounded-lg'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email or username"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <h1 className='text-gray-500 font-medium'>
                            Password
                        </h1>
                        <div className="mt-3">
                            <input
                                type="password"
                                name="password"
                                className='input p-4 bg-gray-200 focus:outline-none w-full rounded-lg'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <Link className='w-full flex justify-end text-blue-800' href='/resetpass'>Forgot Password?</Link>

                    {error && <div className="my-6 text-red-600">{error}</div>}

                    <div className="mb-5">
                        <input
                            className='p-3 w-full bg-blue-800 text-white hover:bg-blue-600 rounded-lg mt-8'
                            type="submit"
                            value="Log In"
                        />
                    </div>

                    <div className='flex flex-col gap-5 text-center mt-12'>
                        <p>
                            New Member?{' '}
                            <Link className='text-blue-800 hover:text-blue-600' href="/signup">
                                Sign Up
                            </Link>
                        </p>
                        <h1 className='text-gray-400'>or continue with</h1>
                        <div className='flex items-center gap-6 justify-center mt-2'>
                            <FaFacebook className='text-2xl' />
                            <FaGoogle className='text-2xl' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;