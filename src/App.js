import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import './normal.css'
import { logo } from './assets';
import Home from './components/Home/Home';
import CreatePost from './pages/creatspost/CreatePost';
import Askq from './pages/askq/Askques';

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Link to="/">
          <img src={logo} alt="logo" className='logoimg' />
        </Link>
        <div className="options">
          <Link to="/ask-qs" className='btns'>
            <p>
              Ask Questions
            </p>
          </Link>
          <Link to="/create-post" className='btns'>
            <p>
              Create Images
            </p>
          </Link>
        </div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask-qs" element={<Askq />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
