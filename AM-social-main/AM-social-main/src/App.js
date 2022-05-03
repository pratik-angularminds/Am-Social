import "./App.css";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route, Router, Routes, Navigate } from "react-router-dom";
import LogIn from "./Components/LogIn";
import Feed from "./Components/Feed";
import Header from "./Components/Header";
import AddFeed from "./Components/AddFeed";
import EditProfile from "./Components/EditProfile";
import ChangePassword from "./Components/ChangePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<Feed />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/AddFeed" element={<AddFeed />} />
            <Route path="/Change" element={<ChangePassword />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    
    </>
  );
}


export default App;