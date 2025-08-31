// frontend/app/board/write/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './write.module.css';

export default function WritePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 이 부분에서 백엔드 API를 호출하여 게시글을 저장합니다.
    // 현재는 임시 로직으로 처리합니다.
    console.log('새 게시글:', { title, content });

    alert('게시글이 성공적으로 작성되었습니다.');
    router.push('/board'); // 게시글 작성 후 게시판 목록으로 이동
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Farm System Community</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="제목을 입력하세요"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          placeholder="이곳은 커뮤니티 게시물의 내용이 입력됩니다. 최대 N자까지 작성할 수 있습니다."
          rows="15"
        ></textarea>
        <button type="submit" className={styles.submitButton}>작성 완료</button>
      </form>

      {/* 하단 내비게이션 바 */}
      <nav className={styles.bottomNav}>
        <Link href="/board" className={styles.navButton}>
          <span className={styles.navIcon}>📌</span>
          <span>Post</span>
        </Link>
        <Link href="/mypage" className={styles.navButton}>
          <span className={styles.navIcon}>👤</span>
          <span>Mypage</span>
        </Link>
        <Link href="/board/write" className={styles.navButton}>
          <span className={styles.navIcon}>✏️</span>
        </Link>
      </nav>
    </div>
  );
}