import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Pages and Components
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Blogs from './components/Blogs';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Blogs' element={<Blogs />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
