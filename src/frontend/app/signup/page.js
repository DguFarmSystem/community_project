"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './signup.module.css';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleIdCheck = async () => {
        if (!username) {
            alert('아이디를 입력해주세요.');
            return;
        }
        const isDuplicate = username === 'existing_user';
        if (isDuplicate) {
            alert('이미 사용 중인 아이디입니다.');
        } else {
            alert('사용 가능한 아이디입니다.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            alert('회원가입 성공!');
            router.push('/');
        } catch (error) {
            console.error("회원가입 중 에러 발생:", error);
            alert('회원가입 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <form onSubmit={handleSignup} className={styles.formContainer}>
                <label className={styles.label}>이름</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    placeholder="이름을 입력하세요"
                />

                <div className={styles.idContainer}>
                    <label className={styles.label}>아이디</label>
                    <button type="button" onClick={handleIdCheck} className={styles.checkButton}>중복확인</button>
                </div>
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

                <label className={styles.label}>비밀번호 재확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                    placeholder="비밀번호를 다시 입력하세요"
                />

                <button type="submit" className={styles.signupButton}>가입하기</button>
                <Link href="/" className={styles.linkText}>로그인 페이지로 돌아가기</Link>
            </form>
        </div>
    );
}