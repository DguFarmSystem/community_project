import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>커뮤니티 메인 페이지입니다.</h1>
            <p>로그인 또는 회원가입을 해주세요.</p>
            <Link href="/login">
                로그인
            </Link>
            <br />
            <Link href="/signup">
                회원가입
            </Link>
        </div>
    );
}
