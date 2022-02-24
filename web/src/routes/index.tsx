import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const RoutesStack: React.FC = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/repository/:pUser/:pRepository" element={<Repository />} />
  </Routes>
)

export default RoutesStack;
