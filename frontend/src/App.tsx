import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoveBox from './components/LoveBox';
import CreateLink from './components/CreateLink';

// --- APP ROUTING ---
export default function App() {
  return (
    <BrowserRouter basename="/purr-posal">
      <Routes>
        <Route path="/create" element={<CreateLink />} />
        <Route path="/love/:token" element={<LoveBox />} />
      </Routes>
    </BrowserRouter>
  );
}
