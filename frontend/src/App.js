import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Pages and Components
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import ContactUs from './pages/ContactUS/ContactUs';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path='/Login' element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
