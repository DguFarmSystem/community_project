"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents form submission from reloading the page

        // This is where you would call your backend API for login
        // Temporary success/failure logic is written here
        try {
            // Actual API call (example)
            // const response = await fetch('/api/login', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ username, password }),
            // });

            // const data = await response.json();

            // if (data.success) {
            if (username === 'test' && password === '1234') { // Temporary login success condition
                alert('Login!');
                router.push('/'); // Redirects to the main page on successful login
            } else {
                alert('Login FAILED. Please check your ID or password.');
            }
        } catch (error) {
            console.error("Login ERROR:", error);
            alert('There is a problem in Login.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Farm System Community</h1>

            <form onSubmit={handleLogin} className={styles.formContainer}>
                <label className={styles.label}>ID</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your ID"
                />

                <label className={styles.label}>PassWord</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your password"
                />

                <button type="submit" className={styles.loginButton}>Login</button>

                <Link href="/signup" className={styles.signupText}>
                    SignUp
                </Link>
            </form>
        </div>
    );
}