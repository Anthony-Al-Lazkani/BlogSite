import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Pages and Components
import Home from './pages/Home/Home';
import About from './pages/About/About';
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
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
