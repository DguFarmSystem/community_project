// frontend/app/board/[postId]/edit/page.js

"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './edit.module.css'; // edit.module.css 사용
import postStyles from '../post.module.css'; // 게시글 조회 화면 스타일을 가져옴 (블러 처리용)

// 임시 게시글 데이터 (비밀번호 포함)
const posts = [
  { id: '1', title: '첫 번째 게시글입니다', content: '수정할 내용입니다.', author: '작성자1', password: '111', date: '2025.08.29', likes: 12, comments: 3 },
  { id: '2', title: '커뮤니티 이용 안내', content: '수정할 내용입니다.', author: '관리자', password: '222', date: '2025.08.28', likes: 25, comments: 8 },
  { id: '3', title: '안녕하세요! 반갑습니다', content: '수정할 내용입니다.', author: '익명', password: '333', date: '2025.08.27', likes: 8, comments: 1 },
];

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId;

  const post = posts.find(p => p.id === postId);

  const [password, setPassword] = useState('');
  const [content, setContent] = useState(post ? post.content : '');
  const [error, setError] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  if (!post) {
    return <div className={styles.container}>게시글을 찾을 수 없습니다.</div>;
  }

  const handlePasswordCheck = (e) => {
    e.preventDefault();
    setError('');

    if (password === post.password) {
      setIsPasswordVerified(true);
      // alert('비밀번호가 확인되었습니다. 게시글을 수정할 수 있습니다.'); // 알림 대신 바로 화면 전환
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // 임시 로직: 실제 백엔드 연동 시 이 부분에서 API 호출
    const updatedPosts = posts.map(p => 
      p.id === postId ? { ...p, content: content } : p
    );
    console.log('수정된 게시글 데이터 (임시):', updatedPosts.find(p => p.id === postId));

    alert('게시글이 성공적으로 수정되었습니다.');
    router.push(`/board/${postId}`); // 수정 후 상세 페이지로 이동
  };

  const handleCancelEdit = () => {
    router.back(); // 이전 페이지(상세 페이지)로 돌아가기
  };

  return (
    // 전체 컨테이너는 이제 모달 오버레이 역할
    <div className={styles.modalOverlay}>
      {/* 블러 처리될 배경 (여기서는 postStyles를 활용하여 실제 게시글 내용을 가정) */}
      <div className={`${styles.blurryBackground}`}>
        {/* 실제 블러처리될 내용은 이 위치에 들어갈 수 있습니다 (선택 사항) */}
        {/* 예시: <PostDetailContent postId={postId} /> */}
        <div className={postStyles.pageContainer}> {/* post.module.css의 스타일을 사용하여 배경 요소 배치 */}
          <div className={postStyles.header}>
            <h1 className={postStyles.title}>{post.title}</h1>
            <div className={postStyles.meta}>
              <p className={postStyles.author}>{post.author}</p>
              <p className={postStyles.date}>{post.date}</p>
            </div>
          </div>
          <div className={postStyles.content}>
            <p className={postStyles.postText}>{post.content}</p>
          </div>
        </div>
      </div>

      {/* 모달 콘텐츠 */}
      <div className={styles.modalContent}>
        {!isPasswordVerified ? (
          <form onSubmit={handlePasswordCheck} className={styles.passwordForm}>
            <h2 className={styles.modalTitle}>비밀번호 확인</h2>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="비밀번호를 입력하세요"
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <div className={styles.modalActions}>
              <button type="submit" className={styles.submitButton}>확인</button>
              <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>취소</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSave} className={styles.editForm}>
            <h2 className={styles.modalTitle}>게시글 수정</h2>
            <label className={styles.label}>제목</label>
            <input 
              type="text"
              value={post.title}
              className={styles.input}
              readOnly
            />
            <label className={styles.label}>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
              rows="10"
            ></textarea>
            <div className={styles.modalActions}>
              <button type="submit" className={styles.saveButton}>수정 완료</button>
              <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>취소</button>
            </div>
          </form>
        )}
      </div>

      {/* 하단 내비게이션 바는 모달 위에 위치하도록 유지 */}
      <nav className={postStyles.bottomNav}> {/* postStyles에서 bottomNav를 가져옴 */}
        <Link href="/board" className={postStyles.navButton}>
          <span className={postStyles.navIcon}>📌</span>
          <span>Post</span>
        </Link>
        <Link href="/mypage" className={postStyles.navButton}>
          <span className={postStyles.navIcon}>👤</span>
          <span>Mypage</span>
        </Link>
        <Link href="/board/write" className={postStyles.navButton}>
          <span className={postStyles.navIcon}>✏️</span>
        </Link>
      </nav>
    </div>
  );
}