import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom"
import CodeVerificaction from "./components/login/CodeVerification";
import NavigationMenu from "./components/footer/Footer";
import Login from "./components/login/Login";
import LoginWithPhone from "./components/login/LoginWithPhone";
import Navigationbar from "./components/nav/Navigationbar";
import Register from "./components/login/Register";
import DashBoardRouter from "./router/DashBoardRouter";
import PrivateRouter from "./router/PrivateRouter";
import PublicRouter from "./router/PublicRouter";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [check, setCheck] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);

      } else {
        setIsLoggedIn(false);
      }
      setCheck(false)
      if (Object.entries(userStore).length === 0) {
        const {
          displayName,
          email,
          phoneNumber,
          accessToken,
          photoURL,
          uid,
        } = user.auth.currentUser;
        dispatch(
          actionLoginSync({
            name: displayName,
            email,
            accessToken,
            phoneNumber,
            avatar: photoURL,
            uid,
            error: false,
          })
        );
      }

    }

    );
  }, [setIsLoggedIn, dispatch, userStore]);
  return (
    <HashRouter>
      <div className="App">
        <Navigationbar isAuthentication={isLoggedIn} />
        <NavigationMenu isAuthentication={isLoggedIn} />
        <Routes>
          <Route element={<PublicRouter isAuthentication={isLoggedIn} />}>
            <Route path="/register" element={<Register />} />
            <Route path="/phoneLogin" element={<LoginWithPhone />} />
            <Route path="/verification" element={<CodeVerificaction />} />
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<PrivateRouter isAuthentication={isLoggedIn} />}>
            <Route path="/*" element={<DashBoardRouter />} />
          </Route>
          {/* <Route path="*" element={<Nomtach/>}/> */}
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
