// frontend/app/login/page.js

import React from 'react';

// Next.js의 Link 컴포넌트를 임포트하여 페이지 이동을 처리
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Farm System Community</h1>

            <div style={styles.formContainer}>
                {/* 아이디 입력 필드 */}
                <label style={styles.label}>아이디</label>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="아이디를 입력하세요"
                />

                {/* 비밀번호 입력 필드 */}
                <label style={styles.label}>비밀번호</label>
                <input
                    type="password"
                    style={styles.input}
                    placeholder="비밀번호를 입력하세요"
                />

                {/* 로그인 버튼 */}
                <button style={styles.loginButton}>로그인</button>

                {/* 회원가입 링크 */}
                {/* Link 컴포넌트를 사용하여 페이지 이동 시 새로고침 방지 */}
                <Link href="/signup">
                    <p style={styles.signupText}>회원가입</p>
                </Link>
            </div>
        </div>
    );
}

// 간단한 인라인 스타일
// 나중에는 CSS 모듈이나 TailwindCSS로 변경하는 것을 권장합니다.
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
        color: '#388e3c', // 녹색
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