import React, { useEffect, useState } from 'react';
import useTitle from '@jacob-hooks/use-title';
import {authService} from '../fbase'
import AppRouter from './Router';

function App() {
  useTitle('Chat-app')
  // authService.currentUser 를 통해 로그인 되었는지 안되었는지 확인 할 수 있음 (로그인 안되어 있으면 null 이 return )
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear()} Jacob Ko</footer>
    </>
  );
}

export default App;
