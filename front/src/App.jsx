import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import Header from './components/Header';

function App() {
   return (
      <Router>
         <Header />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/edit-post/:id" element={<EditPostPage />} />
            <Route path="*" element={<Navigate to="/" />} />
         </Routes>
      </Router>
   );
}

export default App;
