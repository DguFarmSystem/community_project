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
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        // 이 부분에서 백엔드 API를 호출하여 로그인 처리를 합니다!!!!!!
        // 임시로 성공/실패 로직을 작성해 두었습니다!!!!!!
        try {
            // 실제 API 호출 (예시)
            // const response = await fetch('/api/login', {
            //  method: 'POST',
            //  headers: {
            //    'Content-Type': 'application/json',
            //  },
            //  body: JSON.stringify({ username, password }),
            // });

            // const data = await response.json();

            // if (data.success) {
            if (username === 'test' && password === '1234') { // 임시 로그인 성공 조건
                alert('로그인 성공!');
                router.push('/'); // 로그인 성공 시 메인 페이지로 이동
            } else {
                alert('로그인 실패! 아이디 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error("로그인 중 에러 발생:", error);
            alert('로그인 처리 중 문제가 발생했습니다.');
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

                {/* 로그인 버튼을 <button> 태그로 변경하고, form의 onSubmit을 통해 함수 실행 */}
                <button type="submit" className={styles.loginButton}>로그인</button>

                <Link href="/signup">
                    <p className={styles.signupText}>회원가입</p>
                </Link>
            </form>
        </div>
    );
}