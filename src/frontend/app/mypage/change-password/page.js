// frontend/app/mypage/change-password/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './change-password.module.css';

const currentUser = {
  username: '작성자1',
  name: '홍길동',
  password: '111' // 현재 비밀번호
};

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. 현재 비밀번호 확인
    if (currentPassword !== currentUser.password) {
      setError('현재 비밀번호가 올바르지 않습니다.');
      return;
    }
    
    // 2. 새로운 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (newPassword !== confirmNewPassword) {
      setError('새로운 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 3. 새로운 비밀번호가 현재 비밀번호와 다른지 확인
    if (newPassword === currentPassword) {
      setError('새로운 비밀번호는 현재 비밀번호와 달라야 합니다.');
      return;
    }

    // 실제로는 백엔드 API를 호출하여 비밀번호를 변경합니다.
    console.log(`사용자 ${currentUser.username}의 비밀번호를 변경했습니다.`);
    alert('비밀번호가 성공적으로 변경되었습니다.');
    router.push('/mypage');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Farm System Community</h1>
      <h2 className={styles.pageTitle}>MY PAGE</h2>
      <h3 className={styles.subTitle}>비밀번호 변경</h3>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.inputField}
            placeholder="현재 비밀번호를 입력하세요"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>새로운 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.inputField}
            placeholder="새로운 비밀번호를 입력하세요"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>새로운 비밀번호 확인</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={styles.inputField}
            placeholder="새로운 비밀번호를 다시 입력하세요"
          />
        </div>
        
        {error && <p className={styles.errorText}>{error}</p>}
        
        <button type="submit" className={styles.submitButton}>비밀번호 변경</button>
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