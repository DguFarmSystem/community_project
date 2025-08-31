"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './edit.module.css';

// 임시 게시글 데이터 (비밀번호 포함)
const posts = [
  { id: '1', title: '첫 번째 게시글입니다', content: '수정할 내용입니다.', author: '작성자1', password: '111', date: '2025.08.29' },
  { id: '2', title: '커뮤니티 이용 안내', content: '수정할 내용입니다.', author: '관리자', password: '222', date: '2025.08.28' },
  { id: '3', title: '안녕하세요! 반갑습니다', content: '수정할 내용입니다.', author: '익명', password: '333', date: '2025.08.27' },
];

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId;

  const post = posts.find(p => p.id === postId);

  const [password, setPassword] = useState('');
  const [content, setContent] = useState(post ? post.content : '');
  const [error, setError] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 새로운 상태 추가

  if (!post) {
    return <div className={styles.container}>게시글을 찾을 수 없습니다.</div>;
  }

  const handlePasswordCheck = (e) => {
    e.preventDefault();
    setError('');

    if (password === post.password) {
      setIsPasswordVerified(true);
      alert('비밀번호가 확인되었습니다. 게시글을 수정할 수 있습니다.');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log(`게시글 ${postId} 수정 완료!`);
    console.log('새로운 내용:', content);

    alert('게시글이 성공적으로 수정되었습니다.');
    router.push(`/board/${postId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>제목</h1>
      <p className={styles.postInfo}>
        <span className={styles.author}>{post.author}</span>
        <span className={styles.date}>{post.date}</span>
      </p>
      <p className={styles.postContent}>{post.content}</p>

      <hr className={styles.divider} />

      {/* 비밀번호 확인 단계 */}
      {!isPasswordVerified && (
        <form onSubmit={handlePasswordCheck} className={styles.passwordForm}>
          <label className={styles.label}>비밀번호</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="비밀번호를 입력하세요"
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit" className={styles.submitButton}>수정</button>
        </form>
      )}

      {/* 수정 폼 (비밀번호 확인 후 나타남) */}
      {isPasswordVerified && (
        <form onSubmit={handleSave} className={styles.editForm}>
          <label className={styles.label}>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            rows="10"
          ></textarea>
          <button type="submit" className={styles.saveButton}>수정 완료</button>
        </form>
      )}

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