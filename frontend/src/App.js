import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Pages and Components
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
