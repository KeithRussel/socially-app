import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditPostPage from "./pages/EditPostPage";
import EditProfilePage from "./pages/EditProfilePage";
import WithNav from "./components/WithNav";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/user/me" element={<Profile />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
            <Route path="/profile/:id/edit" element={<EditProfilePage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
