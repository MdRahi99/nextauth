'use client'
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import AuthImage from '../../../components/AuthImage/AuthImage';

const ResetPassword = () => {

    const [resetEmailSent, setResetEmailSent] = useState(false);
    const { resetPassword } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
    });

    const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await resetPassword(formData.email);
            setResetEmailSent(true);
            router.push('/signin')
        } catch (error) {
            console.log(error);

        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className='flex flex-col lg:flex-row items-center justify-between h-screen'>
            <div className='w-full lg:w-7/12'>
                <AuthImage />
            </div>

            <div className='w-full lg:w-5/12 h-screen p-10 lg:p-16 flex flex-col justify-center gap-3'>
                <h1 className='text-3xl font-bold'>Forgot Password</h1>
                <p>Enter your registered email to reset your password</p>
                <form className='mt-8' onSubmit={handleForgotPassword}>
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

                    {resetEmailSent && <p>Password reset email sent. Check your inbox.</p>}

                    <div className="mb-5">
                        <input
                            className='p-3 w-full bg-blue-800 text-white hover:bg-blue-600 rounded-lg mt-8'
                            type="submit"
                            value="Continue"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;