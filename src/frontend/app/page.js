import Link from "next/link";
export default function HomePage() {
    return (
        <div>
            <h1>WELCOME!</h1>
            <Link href="/login">로그인</Link>
            <br />
            <Link href="/signup">회원가입</Link>
        </div>
    );
}