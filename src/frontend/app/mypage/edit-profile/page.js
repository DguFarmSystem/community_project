// frontend/app/mypage/edit-profile/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './edit-profile.module.css';

// 임시 사용자 정보 (실제로는 로그인된 사용자 정보를 가져옴)
const currentUser = {
  username: '작성자1',
  name: '홍길동'
};

export default function EditProfilePage() {
  const router = useRouter();
  const [newName, setNewName] = useState(currentUser.name); // 현재 이름을 초기값으로 설정
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newName.trim()) {
      setError('새로운 이름을 입력해주세요.');
      return;
    }

    // 실제로는 백엔드 API를 호출하여 사용자 정보를 수정합니다.
    console.log(`사용자 ${currentUser.username}의 이름을 ${newName}으로 변경.`);
    setSuccess('회원 정보가 성공적으로 수정되었습니다.');
    alert('회원 정보가 성공적으로 수정되었습니다.');
    router.push('/mypage'); // 수정 후 마이페이지로 이동
  };

  const handleCancel = () => {
    router.back(); // 이전 페이지로 돌아가기
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Farm System Community</h1>
      <h2 className={styles.subTitle}>회원정보 수정</h2>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>현재 이름</label>
          <span className={styles.currentName}>{currentUser.name}</span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>새로운 이름</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.inputField}
            placeholder="새로운 이름을 입력하세요"
          />
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
        {success && <p className={styles.successText}>{success}</p>}

        <button type="submit" className={styles.submitButton}>회원정보 수정</button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>취소</button>
      </form>

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