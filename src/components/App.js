import React, { useEffect, useState } from "react";
import useTitle from "@jacob-hooks/use-title";
import { authService } from "../fbase";
import AppRouter from "./AppRouter";

function App() {
  useTitle("Chat-app");
  // authService.currentUser 를 통해 로그인 되었는지 안되었는지 확인 할 수 있음 (로그인 안되어 있으면 null 이 return )
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          const ind = user.email.indexOf("@");
          const end = user.email.substring(0, ind);
          user.updateProfile({ displayName: end });
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });

        // console.log 해보면 user 의 정보의 양이 많기 때문에 setUserObj 에서 필요한 정보만 불러 올수 있게 지정해줌 (App 구동 속도 향상됨 )
        // console.log(user);
        // 다른 방법으로 user 를 전체 가지고 온다음에 Object.assign() 하는 방법
        // setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // user edit re-render
  // userObj 의 정보의 양이 많기 때문에 react 에서 re-render 가 되지 않기 때문에 필요한 정보만 불러와서 사용해야 함
  const refreshUser = () => {
    const user = authService.currentUser;
    console.log(authService.currentUser.displayName);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // Object.assign() 하는 방식 :target 과 source 가 필요한데 기본적으로 빈 object 와 source 가 필요한데 비어 있는 object 안에 user 사본이 새 object 로 생성 되는데 그때 react 에서 새로운 object 가 생성됬기 때문에 re-render 과정을 함 (첫번째 방법을 추천 앱 구동 속도 관련때문에 )
    // setUserObj(Object.assign({}, user));
  };

  return (
    <>
      {init ? (
        <AppRouter
          basename={process.env.PUBLIC_URL}
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing...."
      )}
      <div className="footer">
        <footer>&copy; {new Date().getFullYear()} Jacob Ko</footer>
      </div>
    </>
  );
}

export default App;
