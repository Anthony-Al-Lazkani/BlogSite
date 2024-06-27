import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Pages and Components
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar1 from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar1 />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
