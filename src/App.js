import { Routes, Route } from "react-router-dom";
import AppLayout from "./Components/appLayout";
import Home from "./Components/home";
import Main from "./Components/main";
import Login from "./Components/login";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import React from "react";
import { UserContext } from "./Components/context/authContext";
import RequireAuth from "./Components/context/requireAuth";
import NotFound from "./Components/notFound";
import User from "./Components/user";
import UserTask from "./Components/userTask1";

const AdminAuthRequire = (
  <RequireAuth>
    <Home />
  </RequireAuth>
);

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    const token = Cookies.get();
    const myDecodedToken = decodeToken(token.auth_token);
    setCurrentUser(myDecodedToken);
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Main />} />
          <Route path="/home" element={AdminAuthRequire}>
            <Route path="user" element={<User />} />
            <Route path="usertask" element={<UserTask />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
