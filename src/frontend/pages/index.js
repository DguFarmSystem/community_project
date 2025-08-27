// frontend/pages/index.js

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>커뮤니티 메인 페이지입니다.</h1>
            <p>로그인 또는 회원가입을 해주세요.</p>
            <Link href="/login">
                <a>로그인</a>
            </Link>
            <br />
            <Link href="/signup">
                <a>회원가입</a>
            </Link>
        </div>
    );
}
