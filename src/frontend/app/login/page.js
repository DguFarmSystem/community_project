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
                alert('로그인 성공!');
                router.push('/board'); // Redirects to the main page on successful login
            } else {
                alert('아이디나 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            alert('로그인 중에 오류가 생겼습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Farm System Community</h1>

            <form onSubmit={handleLogin} className={styles.formContainer}>
                <label className={styles.label}>아이디</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder="아이디를 입력하세요"
                />

                <label className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="비밀번호를 입력하세요"
                />

                <button type="submit" className={styles.loginButton}>로그인</button>

                <Link href="/signup" className={styles.signupText}>
                    회원가입
                </Link>
            </form>
        </div>
    );
}