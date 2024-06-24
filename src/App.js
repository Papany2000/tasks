import { Routes, Route } from "react-router-dom";
import AppLayout from "./Components/appLayout";
import Home from "./Components/home";
import Main from "./Components/main";
import Login from "./Components/login";
import Cookies from 'js-cookie';
import { decodeToken } from "react-jwt";

function App() {

  const token =  Cookies.get()
  const myDecodedToken = decodeToken(token.auth_token);
  console.log(24, myDecodedToken)
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
