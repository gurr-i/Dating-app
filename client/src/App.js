import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from './LoginPage';
import SuccessPage from './SuccessPage';
import BirthdateSelection from './BirthdateSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/birthdate" element={<BirthdateSelection />} />
      </Routes>
    </Router>
  );
}

export default App;