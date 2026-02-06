import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import LoveBox from './components/LoveBox';
import CreateLink from './components/CreateLink';



// --- APP ROUTING ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateLink />} />
        <Route path="/love/:token" element={<LoveBox />} />
      </Routes>
    </BrowserRouter>
  );
}
