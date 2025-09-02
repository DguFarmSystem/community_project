// frontend/app/mypage/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './mypage.module.css';

// 임시 사용자 정보
const currentUser = {
  username: '작성자1',
  name: '홍길동',
  password: '111'
};

// 임시 게시글 데이터
const allPosts = [
  { id: 1, title: '첫 번째 게시글입니다', author: '작성자1', date: '2025.08.29' },
  { id: 2, title: '잘 부탁드립니다~!', author: '작성자2', date: '2025.08.28' },
  { id: 3, title: '안녕하세요! 반갑습니다', author: '작성자1', date: '2025.08.27' },
  { id: 4, title: '익명으로 쓴 글입니다', author: '익명', date: '2025.08.26' },
];

// 임시 댓글 데이터 추가
const allComments = [
  { id: 1, postId: 1, text: '첫 번째 게시글에 대한 댓글입니다.', author: '작성자1', date: '2025.08.29' },
  { id: 2, postId: 2, text: '반갑습니다!', author: '작성자2', date: '2025.08.28' },
  { id: 3, postId: 3, text: '좋은 글이네요.', author: '작성자1', date: '2025.08.27' },
  { id: 4, postId: 4, text: '익명으로 쓴 댓글입니다.', author: '익명', date: '2025.08.26' },
];

export default function MyPage() {
  const router = useRouter();
  
  const myPosts = allPosts.filter(post => post.author === currentUser.username);
  const myComments = allComments.filter(comment => comment.author === currentUser.username);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const handleLogout = () => {
    alert('로그아웃되었습니다.');
    router.push('/');
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setDeleteError('');

    if (deletePassword === currentUser.password) {
      alert('회원 탈퇴가 완료되었습니다.');
      router.push('/');
    } else {
      setDeleteError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Farm System Community</h1>
      <h2 className={styles.subTitle}>MY PAGE</h2>

      <div className={styles.profileSection}>
        <div className={styles.profileAvatar}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" fill="#333"/>
          </svg>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>이름</span>
            <span className={styles.infoValue}>{currentUser.name}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>아이디</span>
            <span className={styles.infoValue}>{currentUser.username}</span>
          </div>
        </div>
      </div>

      <div className={styles.menuList}>
        <Link href="/mypage/edit-profile" className={styles.menuItem}>회원정보 수정</Link>
        <Link href="/mypage/change-password" className={styles.menuItem}>비밀번호 변경</Link>
        <button onClick={handleLogout} className={styles.menuItem}>로그아웃</button>
        <button onClick={() => setShowDeleteModal(true)} className={styles.menuItem}>회원 탈퇴</button>
      </div>

      <h2 className={styles.listTitle}>내가 작성한 게시글</h2>
      <div className={styles.postList}>
        {myPosts.length > 0 ? (
          myPosts.map(post => (
            <div key={post.id} className={styles.postCard}>
              <Link href={`/board/${post.id}`} className={styles.postLink}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postDate}>{post.date}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.noPostText}>작성한 게시글이 없습니다.</p>
        )}
      </div>

      <h2 className={styles.listTitle}>내가 작성한 댓글</h2>
      <div className={styles.postList}>
        {myComments.length > 0 ? (
          myComments.map(comment => (
            <div key={comment.id} className={styles.commentCard}> {/* 새로운 댓글 스타일 사용 */}
              <Link href={`/board/${comment.postId}`} className={styles.commentLink}>
                <p className={styles.commentText}>{comment.text}</p>
                <p className={styles.commentDate}>{comment.date}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.noPostText}>작성한 댓글이 없습니다.</p>
        )}
      </div>
      
      {showDeleteModal && (
        <div className={styles.deleteModalOverlay}>
          <form onSubmit={handleDeleteAccount} className={styles.deleteModal}>
            <p>회원 탈퇴를 하려면 비밀번호를 입력하세요.</p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className={styles.modalInput}
              placeholder="비밀번호를 입력하세요"
            />
            {deleteError && <p className={styles.modalError}>{deleteError}</p>}
            <div className={styles.modalActions}>
              <button type="submit" className={styles.confirmButton}>회원 탈퇴</button>
              <button type="button" onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>취소</button>
            </div>
          </form>
        </div>
      )}

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