'use client'
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';

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
        <div>
            <form onSubmit={handleForgotPassword}>
                <div className="mb-4">
                    <label>
                        Email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                {resetEmailSent && <p>Password reset email sent. Check your inbox.</p>}

                <div className="mb-5">
                    <input
                        type="submit"
                        value="Reset"
                    />
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;