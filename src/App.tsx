import { useCallback, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { zones, EXHIBITION_TITLE } from './data/zones';
import { useScrollReveal, useScrollProgress, useScrollToTop } from './hooks/useScrollReveal';
import Home from './pages/Home';
import AreaPage from './pages/AreaPage';
import TruthTest from './pages/TruthTest';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  useScrollToTop();
  useScrollReveal();
  useScrollProgress(useCallback((p: number) => setProgress(p), []));

  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="brand">
          {EXHIBITION_TITLE}
        </Link>
        <nav>
          {zones.map((z) => (
            <NavLink key={z.id} to={z.areas[0].route}>
              {z.title}
            </NavLink>
          ))}
          <NavLink to="/zone-4/truth-test">Truth Test</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <span className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      </header>

      {/* Keyed on the path so each page replays its entrance transition. */}
      <main key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Every zone route is generated from the registry, so a route and its
              Cloudinary folder can never drift apart. */}
          {zones
            .flatMap((z) => z.areas)
            .map((area) => (
              <Route key={area.route} path={area.route} element={<AreaPage area={area} />} />
            ))}

          {/* Zone 4's one screen-based activity. It is not an AreaPage, so it is
              declared by hand rather than generated from the registry. */}
          <Route path="/zone-4/truth-test" element={<TruthTest />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>
          From Stone to Smartphone · A pop-up museum by Team ChronoScribes · UPDH
          Course Project
        </p>
      </footer>
    </div>
  );
}
