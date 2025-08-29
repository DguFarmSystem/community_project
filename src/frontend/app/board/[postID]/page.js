// frontend/app/board/[postId]/page.js

"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './post.module.css';

// 임시 게시글 데이터
const posts = [
  { id: '1', title: '첫 번째 게시글입니다', content: '이곳은 커뮤니티 게시물의 내용이 입력됩니다. 최대 N자까지 작성 가능합니다.', author: '작성자1', date: '2025.08.29', likes: 12, comments: 3 },
  { id: '2', title: '커뮤니티 이용 안내', content: '이곳은 커뮤니티 게시물의 내용이 입력됩니다. 최대 N자까지 작성 가능합니다.', author: '작성자2', date: '2025.08.28', likes: 25, comments: 8 },
  { id: '3', title: '안녕하세요! 반갑습니다', content: '이곳은 커뮤니티 게시물의 내용이 입력됩니다. 최대 N자까지 작성 가능합니다.', author: '작성자3', date: '2025.08.27', likes: 8, comments: 1 },
];

// 임시 댓글 데이터
const comments = [
  { id: '1', author: '댓글작성자1', content: '이 게시글 정말 유익하네요!', date: '2025.08.29' },
  { id: '2', author: '댓글작성자2', content: '저도 같은 생각입니다.', date: '2025.08.29' },
  { id: '3', author: '댓글작성자3', content: '좋은 글 감사합니다.', date: '2025.08.29' },
];

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId;

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return <div className={styles.pageContainer}>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <p className={styles.author}>{post.author}</p>
          <p className={styles.date}>{post.date}</p>
          <div className={styles.actions}>
            <Link href={`/board/edit/${post.id}`} className={styles.actionLink}>
              수정
            </Link>
            <span className={styles.separator}>|</span>
            <button className={styles.actionButton}>삭제</button>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <p className={styles.postText}>{post.content}</p>
        <div className={styles.stats}>
          <span>❤️ 좋아요 {post.likes}</span>
          <span>💬 댓글 {post.comments}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.commentsSection}>
        {comments.map(comment => (
          <div key={comment.id} className={styles.comment}>
            <p className={styles.commentContent}>{comment.content}</p>
            <div className={styles.commentMeta}>
              <span>{comment.author}</span>
              <span>{comment.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className={styles.commentInputBox}>
        <input type="text" placeholder="댓글을 입력하세요" className={styles.commentInput} />
        <button className={styles.sendButton}>➤</button>
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