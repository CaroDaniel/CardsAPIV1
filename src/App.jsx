import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listas from './Componentes/Listas';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listas />} />
      </Routes>
    </Router>
  );
}

export default App;