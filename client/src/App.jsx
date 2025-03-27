import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todos from './components/Todos';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
