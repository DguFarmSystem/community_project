"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import styles from './post.module.css';

const currentUser = {
  username: '작성자1',
};

// 임시 게시글 데이터
const posts = [
  { id: '1', title: '첫 번째 게시글입니다', content: '이곳은 커뮤니티 게시물의 내용이 입력됩니다. 최대 N자까지 작성 가능합니다.', author: '작성자1', password: '111', date: '2025.08.29', likes: 12, comments: 3, likedBy: ['작성자1', '작성자3'] },
  { id: '2', title: '커뮤니티 이용 안내', content: '이곳은 커뮤니티 게시물의 내용이 입력됩니다.', author: '관리자', password: '222', date: '2025.08.28', likes: 25, comments: 8, likedBy: ['작성자1', '관리자'] },
  { id: '3', title: '안녕하세요! 반갑습니다', content: '이곳은 커뮤니티 게시물의 내용이 입력됩니다.', author: '익명', password: '333', date: '2025.08.27', likes: 8, comments: 1, likedBy: ['작성자2'] },
];

// 임시 댓글 데이터
const comments = [
  { id: 1, author: '댓글작성자1', content: '이 게시글 정말 유익하네요!', date: '2025.08.29' },
  { id: 2, author: '댓글작성자2', content: '저도 같은 생각입니다.', date: '2025.08.29' },
  { id: 3, author: '댓글작성자3', content: '좋은 글 감사합니다.', date: '2025.08.29' },
];

export default function PostDetailPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [showLikedByModal, setShowLikedByModal] = useState(false);

  const params = useParams();
  const router = useRouter();
  const postId = params.postId;

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return <div className={styles.pageContainer}>게시글을 찾을 수 없습니다.</div>;
  }

// 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(post.likedBy.includes(currentUser.username));
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteError('');
    const inputPassword = prompt('게시글을 삭제하려면 비밀번호를 입력하세요.');
    
    if (inputPassword === post.password) {
      console.log(`게시글 ${postId} 삭제 완료!`);
      alert('게시글이 성공적으로 삭제되었습니다.');
      router.push('/board');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleLike = () => {
    if (isLiked) {
      // 좋아요 취소
      setLikeCount(likeCount - 1);
      alert('좋아요를 취소했습니다.');
    } else {
      // 좋아요
      setLikeCount(likeCount + 1);
      alert('좋아요를 눌렀습니다.');
    }
    setIsLiked(!isLiked);
  };

  const toggleLikedByModal = () => {
    setShowLikedByModal(!showLikedByModal);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <p className={styles.author}>{post.author}</p>
          <p className={styles.date}>{post.date}</p>
          <div className={styles.actions}>
            <Link href={`/board/${post.id}/edit`} className={styles.actionLink}>
              수정
            </Link>
            <span className={styles.separator}>|</span>
            <button onClick={handleDelete} className={styles.actionButton}>
              삭제
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <p className={styles.postText}>{post.content}</p>
        <div className={styles.stats}>
          <button onClick={handleLike} className={styles.likeButton}>
            <span style={{ color: isLiked ? 'red' : 'gray' }}>❤️</span> 좋아요 {likeCount}
          </button>

          <button onClick={toggleLikedByModal} className={styles.plusButton}>
          더보기
          </button>

          <span> 💬 댓글 {post.comments}</span>
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

      <div className={styles.commentInputBox}>
        <input type="text" placeholder="댓글을 입력하세요" className={styles.commentInput} />
        <button className={styles.sendButton}>➤</button>
      </div>

      {showDeleteModal && (
        <div className={styles.deleteModalOverlay}>
          <form onSubmit={handleDelete} className={styles.deleteModal}>
            <p>게시글을 삭제하려면 비밀번호를 입력하세요.</p>
            <input 
              type="password" 
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className={styles.modalInput} 
            />
            {deleteError && <p className={styles.modalError}>{deleteError}</p>}
            <div className={styles.modalButtons}>
              <button type="submit" className={styles.confirmButton}>확인</button>
              <button type="button" onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>취소</button>
            </div>
          </form>
        </div>
      )}

      {showLikedByModal && (
        <div className={styles.likedByModalOverlay}>
          <div className={styles.likedByModal}>
            <h3 className={styles.modalTitle}>이 게시글을 좋아하는 사람</h3>
            <ul className={styles.likedByList}>
              {post.likedBy.length > 0 ? (
                post.likedBy.map((user, index) => (
                  <li key={index} className={styles.likedByItem}>{user}</li>
                ))
              ) : (
                <li>좋아요를 누른 사람이 없습니다.</li>
              )}
            </ul>
            <button onClick={toggleLikedByModal} className={styles.modalCloseButton}>닫기</button>
          </div>
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