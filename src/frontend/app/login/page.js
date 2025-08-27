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
        e.preventDefault(); // �� ���� �� ������ ���ΰ�ħ ����

        // �� �κп��� �鿣�� API�� ȣ���Ͽ� �α��� ó���� �մϴ�!!!!!!
        // �ӽ÷� ����/���� ������ �ۼ��� �ξ����ϴ�!!!!!!
        try {
            // ���� API ȣ�� (����)
            // const response = await fetch('/api/login', {
            //  method: 'POST',
            //  headers: {
            //    'Content-Type': 'application/json',
            //  },
            //  body: JSON.stringify({ username, password }),
            // });

            // const data = await response.json();

            // if (data.success) {
            if (username === 'test' && password === '1234') { // �ӽ� �α��� ���� ����
                alert('�α��� ����!');
                router.push('/'); // �α��� ���� �� ���� �������� �̵�
            } else {
                alert('�α��� ����! ���̵� �Ǵ� ��й�ȣ�� Ȯ�����ּ���.');
            }
        } catch (error) {
            console.error("�α��� �� ���� �߻�:", error);
            alert('�α��� ó�� �� ������ �߻��߽��ϴ�.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Farm System Community</h1>

            <form onSubmit={handleLogin} className={styles.formContainer}>
                <label className={styles.label}>���̵�</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder="���̵� �Է��ϼ���"
                />

                <label className={styles.label}>��й�ȣ</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="��й�ȣ�� �Է��ϼ���"
                />

                {/* �α��� ��ư�� <button> �±׷� �����ϰ�, form�� onSubmit�� ���� �Լ� ���� */}
                <button type="submit" className={styles.loginButton}>�α���</button>

                <Link href="/signup">
                    <p className={styles.signupText}>ȸ������</p>
                </Link>
            </form>
        </div>
    );
}