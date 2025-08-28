import Link from "next/link";
export default function HomePage() {
    return (
        <div>
            <h1>WELCOME!</h1>
            <Link href="/login">Login</Link>
            <br />
            <Link href="/signup">Singup</Link>
        </div>
    );
}