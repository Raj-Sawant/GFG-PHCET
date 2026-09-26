import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const trigger3DIntro = () => {
    window.dispatchEvent(new CustomEvent('replay-gfg-intro'));
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand-column">
          <div className="footer-brand-title">
            <span className="footer-logo-dot" />
            <span>GFG PHCET</span>
          </div>
          <p className="footer-lead">
            GeeksForGeeks Student Chapter &middot; Pillai HOC College of Engineering &amp; Technology
          </p>
          <p className="footer-subtext">
            Rasayani, Navi Mumbai, Maharashtra &middot; Empowering collegiate developers through DSA, hackathons, and technology tracks.
          </p>
        </div>

        <div className="footer-links-column">
          <div className="footer-heading">Quick Navigation</div>
          <div className="footer-links-list">
            <Link to="/" className="footer-link">Home Portal</Link>
            <Link to="/team" className="footer-link">All 21 Chapter Members</Link>
            <button type="button" onClick={trigger3DIntro} className="footer-link-btn">
              <Sparkles size={13} />
              <span>Replay 3D Starting Intro</span>
            </button>
          </div>
        </div>

        <div className="footer-tenure-column">
          <div className="footer-heading">Chapter Credentials</div>
          <div className="footer-tenure-badge">
            <span className="tenure-indicator" />
            <span>Tenure: 2026&ndash;2027</span>
          </div>
          <p className="footer-disclaimer">
            All member profile cards and digital ID credentials are verified under the Pillai HOC College of Engineering &amp; Technology GFG Chapter charter.
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>
          &copy; {new Date().getFullYear()} GFG PHCET Chapter &middot; Designed &amp; Engineered by the Technical Team
        </p>
      </div>
    </footer>
  );
}
