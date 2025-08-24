// frontend/app/login/page.js

import React from 'react';

// Next.js�� Link ������Ʈ�� ����Ʈ�Ͽ� ������ �̵��� ó��
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Farm System Community</h1>

            <div style={styles.formContainer}>
                {/* ���̵� �Է� �ʵ� */}
                <label style={styles.label}>���̵�</label>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="���̵� �Է��ϼ���"
                />

                {/* ��й�ȣ �Է� �ʵ� */}
                <label style={styles.label}>��й�ȣ</label>
                <input
                    type="password"
                    style={styles.input}
                    placeholder="��й�ȣ�� �Է��ϼ���"
                />

                {/* �α��� ��ư */}
                <button style={styles.loginButton}>�α���</button>

                {/* ȸ������ ��ũ */}
                {/* Link ������Ʈ�� ����Ͽ� ������ �̵� �� ���ΰ�ħ ���� */}
                <Link href="/signup">
                    <p style={styles.signupText}>ȸ������</p>
                </Link>
            </div>
        </div>
    );
}

// ������ �ζ��� ��Ÿ��
// ���߿��� CSS ����̳� TailwindCSS�� �����ϴ� ���� �����մϴ�.
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'sans-serif',
    },
    title: {
        color: '#388e3c', // ���
        marginBottom: '2rem',
    },
    formContainer: {
        width: '300px',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: '0.5rem',
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    loginButton: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '1rem',
    },
    signupText: {
        marginTop: '1.5rem',
        color: '#888',
        textDecoration: 'none',
        cursor: 'pointer',
    },
};