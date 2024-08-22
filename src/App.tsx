// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupDashboard from './pages/GroupDashboard/GroupDashboard';
import GroupDetails from './pages/GroupOverview/GroupOverview';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<GroupDashboard />} />
          <Route path="/group/:id" element={<GroupDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>

  );
};

export default App;
