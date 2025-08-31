// frontend/app/board/page.js

"use client";

import React from 'react';
import Link from 'next/link';
import styles from './board.module.css';

const posts = [
  { id: 1, title: '첫 번째 게시글입니다', content: '이곳은 커뮤니티 게시글의 내용이 입력됩니다.', author: '작성자1', date: '2025.08.29', comments: 10 },
  { id: 2, title: '잘 부탁드립니다~!', content: '이곳은 커뮤니티 게시글의 내용이 입력됩니다.', author: '작성자2', date: '2025.08.28', comments: 5 },
  { id: 3, title: '안녕하세요! 반갑습니다', content: '이곳은 커뮤니티 게시글의 내용이 입력됩니다.', author: '작성자3', date: '2025.08.27', comments: 2 },
];

export default function BoardPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Farm System Community</h1>
      <div className={styles.postList}>
        {posts.map(post => (
          <div key={post.id} className={styles.postCard}>
            <Link href={`/board/${post.id}`} className={styles.postLink}>
              <div className={styles.header}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span className={styles.author}>{post.author}</span>
              </div>
              <p className={styles.postContent}>{post.content}</p>
              <div className={styles.meta}>
                <span className={styles.date}>{post.date}</span>
                <div className={styles.comments}>
                  <div className={styles.commentCircle}></div>
                  <span className={styles.commentCount}>{post.comments}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

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