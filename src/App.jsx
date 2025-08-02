import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import DiamondFinder from './DiamondFinder';
import IQTestGame from './IQTestGame';
import AnimalMatchGame from './AnimalMatchGame';
import JumpGame from './JumpGame';
import Game from '../public/Images/Game.jpg';


function App() {
  return (
    <BrowserRouter>
      <header className="flex items-center justify-between px-6 py-4 bg-indigo-500 text-white">
        <div className="flex items-center">
          <img
            src={Game}
            alt="Logo"
            className="w-14 h-14 mr-4 rounded-lg object-cover"
          />
          <p className="text-3xl font-semibold">Developed By Pramod</p>
        </div>


        <nav className="flex gap-6 text-base font-medium">
          <Link to="/" className="hover:underline !text-white text-2xl">Home</Link>
          <Link to="/game" className="hover:underline !text-white text-2xl">Diamond Game</Link>
          <Link to="/animal" className="hover:underline !text-white text-2xl">AnimalMatch</Link>
          <Link to="/iq" className="hover:underline !text-white text-2xl">IQTestGame</Link>
          <Link to="/jump" className="hover:underline !text-white text-2xl">JumpGame</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<DiamondFinder />} />
        <Route path="/iq" element={<IQTestGame/>} />
        <Route path="/animal" element={< AnimalMatchGame/>} />
        <Route path="/jump" element={< JumpGame/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
