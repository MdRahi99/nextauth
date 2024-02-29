'use client'
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp = () => {

    const { signUp, updateUser, loading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [error, setError] = useState<string>("");

    // Handle User Creation
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await signUp(formData.email, formData.password);
            await updateUser(formData.name);
            router.push('/')

        } catch (error: any) {
            console.error('Error signing up:', error);
            setError(
                error.message || "Failed to sign up. Please check your credentials and try again."
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
        <div>
            <form onSubmit={handleSignUp}>
                <div className="mb-4">
                    <label>
                        Name
                    </label>
                    <div className="relative">
                        <input
                            type="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>
                </div>
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
                <div className="mb-4">
                    <label>
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                {error && <div className="my-6 text-red-600">{error}</div>}

                <div className="mb-5">
                    <input
                        type="submit"
                        value="Sign Up"
                    />
                </div>

                <div>
                    <p>
                        Have any account?{' '}
                        <Link href="/signin">
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;