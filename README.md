# 📔 Twitter Chat - Clone App

<a href="https://jacobko.info/chat-app-react-firebase/" target="_blank">Live Demo</a>

![Animation2](https://user-images.githubusercontent.com/28912774/130751269-83ec7b85-e193-4da4-9248-90c86ff38913.gif)

## 💻 1.프로젝트 소개

### 📝 사용기술 및 언어

- React hooks

- React-router-dom

- Firebase (Authentication, Firestore DB, Storage)

### ⏰ 개발 기간

2021-08-02 ~ 2021-08-06

## 📃 2.프로젝트 내용

### 📌 주요 기능

- Realtime chat-app

- 간단한 메시지와 사진파일 업로드 가능 (firebase db 에 저장)

- Firebase Authentication with Email, Google and github

- Profile 에서 Display name(NickName) 변경 가능

### 🎁 설치 패키지

```bash
# CRA
npx create-react-app PROJECT

# React router dom
yarn add react-router-dom

# Firebase
yarn add firebase --save

# UUID
yarn add uuid

# Font awesome
yarn add @fortawesome/fontawesome-free
```

## 🔎 3.주요 코드

### A. Firebase config in Project

```js
// in fbase.js at root
// .env 파일에 security code 를 넣어서 github 에 공유되지 않게 함

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
```

### B. Authentication

> firebase Authentication 관련 내용 (Jacob's DevLog) - [https://jacobko.info/firebase/firebase_2/](https://jacobko.info/firebase/firebase_2/)

### C. Firestore DB

> firebase DB 관련 내용 (Jacob's DevLog) - [https://jacobko.info/firebase/firebase_3/](https://jacobko.info/firebase/firebase_3/)

### D. Storage

> firebase Storage 관련 내용 (Jacob's DevLog) - [https://jacobko.info/firebase/firebase_4/](https://jacobko.info/firebase/firebase_4/)

## 💡 4. Reference

Firebase official reference - [https://firebase.google.com/docs/reference/js](https://firebase.google.com/docs/reference/js)

normard corder - [https://nomadcoders.co/nwitter](https://nomadcoders.co/nwitter)
