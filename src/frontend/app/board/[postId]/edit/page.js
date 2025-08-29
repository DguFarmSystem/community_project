// frontend/app/board/[postId]/edit/page.js

"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

  if (!post) {
    return <div className={styles.container}>게시글을 찾을 수 없습니다.</div>;
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setError('');

    // 1. 비밀번호 확인
    if (password !== post.password) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 2. 게시글 내용 수정 (임시 로직)
    // 실제로는 백엔드 API를 호출하여 수정 처리를 해야 합니다.
    console.log(`게시글 ${postId} 수정 완료!`);
    console.log('새로운 내용:', content);

    alert('게시글이 성공적으로 수정되었습니다.');
    router.push(`/board/${postId}`); // 수정 후 상세 페이지로 이동
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>게시글 수정</h1>
      <form onSubmit={handleEdit} className={styles.formContainer}>
        <label className={styles.label}>제목</label>
        <input 
          type="text"
          value={post.title}
          className={styles.input}
          readOnly // 제목 수정 불가
        />

        <label className={styles.label}>비밀번호 확인</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="비밀번호를 입력하세요"
        />
        {error && <p className={styles.errorText}>{error}</p>}

        <label className={styles.label}>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          rows="10"
        ></textarea>
        
        <button type="submit" className={styles.submitButton}>수정 완료</button>
      </form>
    </div>
  );
}