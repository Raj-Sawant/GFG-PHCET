import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import TeamPage from './pages/TeamPage';
import MemberProfile from './pages/MemberProfile';
import IntroAnimation from './components/IntroAnimation';
import BackgroundMotion from './components/BackgroundMotion';
import './index.css';

// Handler for query parameter redirects (e.g. ?p=/member/slug or ?member=slug)
function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const memberParam = params.get('member') || params.get('m');
    const pathParam = params.get('p');

    if (memberParam) {
      navigate(`/member/${memberParam}`, { replace: true });
    } else if (pathParam) {
      try {
        const decoded = decodeURIComponent(pathParam);
        if (decoded.startsWith('/')) {
          navigate(decoded, { replace: true });
        }
      } catch {
        // ignore malformed query strings
      }
    }
  }, [location, navigate]);

  return null;
}

// Always scroll to the top of the page on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackgroundMotion />
      <RedirectHandler />
      <IntroAnimation />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/member/:slug" element={<MemberProfile />} />
        <Route path="/members/:slug" element={<MemberProfile />} />
        {/* GitHub Pages repo prefix support */}
        <Route path="/GFG-PHCET" element={<Home />} />
        <Route path="/GFG-PHCET/team" element={<TeamPage />} />
        <Route path="/GFG-PHCET/member/:slug" element={<MemberProfile />} />
        <Route path="/GFG-PHCET/members/:slug" element={<MemberProfile />} />
        {/* Wildcard fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
