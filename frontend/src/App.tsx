import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoveBox from './components/LoveBox';
import CreateLink from './components/CreateLink';

// --- APP ROUTING ---
export default function App() {
  return (
    <BrowserRouter basename="/purr-posal">
      <Routes>
        <Route path="/" element={<Navigate to={"/create"}></Navigate>} />
        <Route path="/create" element={<CreateLink />} />
        <Route path="/love/:token" element={<LoveBox />} />
        <Route path="*" element={<Navigate to={"/"}></Navigate>} />
      </Routes>
    </BrowserRouter>
  );
}
