import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Code2,
  Award,
  Terminal,
  Cpu,
  Layers,
} from 'lucide-react';
import { getLandingPageMembers } from '../data/members';
import MemberCard from '../components/MemberCard';
import { InstagramIcon, LinkedInIcon, UnstopIcon } from '../components/SocialIcons';

export default function Home() {
  const leadershipMembers = getLandingPageMembers();

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        {/* Subtle Cyber Grid Background Overlay */}
        <div className="hero-cyber-grid" />

        <div className="hero-grid">
          <div className="hero-content">
            <div className="section-tag hero-badge">
              <span className="live-pulse" />
              <Code2 size={14} />
              <span>GeeksForGeeks Student Chapter &middot; 2026&ndash;27</span>
            </div>

            <h1 className="hero-title">
              Where Code Meets <span className="highlight-emerald">Community.</span>
            </h1>

            <p className="hero-subtitle">
              Pillai HOC College of Engineering &amp; Technology chapter empowering engineers through competitive programming, workshops, and career advancement.
            </p>

            <div className="hero-actions hero-social-actions">
              <a
                href="https://www.instagram.com/gfg_phcet/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-btn instagram"
                title="Follow GFG PHCET on Instagram"
              >
                <InstagramIcon size={18} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/geeksforgeeks-phcet-student-chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-btn linkedin"
                title="Connect with GFG PHCET on LinkedIn"
              >
                <LinkedInIcon size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://unstop.com/college-clubs/geeksforgeeks-student-chapter-phcet-pillai-hoc-college-of-engineering-and-technology-phcet-navi-mumbai-299304"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-btn unstop"
                title="GFG PHCET on Unstop"
              >
                <UnstopIcon size={18} />
                <span>Unstop</span>
              </a>
            </div>

            {/* Stats Strip with Cyber Coordinates */}
            <div className="stats-strip">
              <div className="stat-card">
                <div className="stat-metric">21</div>
                <div className="stat-label">Core Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-metric">6</div>
                <div className="stat-label">Domains</div>
              </div>
              <div className="stat-card">
                <div className="stat-metric">100%</div>
                <div className="stat-label">Student Driven</div>
              </div>
            </div>
          </div>

          {/* Hero Logo – Creative Borderless Design with Animated Glowing Curves */}
          <div className="hero-emblem-wrapper">
            {/* Ambient Radial Energy Glow */}
            <div className="hero-emblem-glow" />

            {/* Dynamic Animated SVG Curves & Orbital Lines */}
            <svg className="hero-curves-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00df82" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#00b386" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00df82" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="curveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#00df82" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#00df82" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Layer 1: Outermost dashed planetary ring */}
              <circle
                cx="250" cy="250" r="215"
                stroke="rgba(0, 223, 130, 0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                className="anim-spin-slow"
              />

              {/* Layer 2: Sweeping curved neon arc 1 */}
              <circle
                cx="250" cy="250" r="190"
                stroke="url(#curveGrad1)"
                strokeWidth="2.5"
                strokeDasharray="140 220"
                strokeLinecap="round"
                filter="url(#glowFilter)"
                className="anim-spin-medium"
              />

              {/* Layer 3: Sweeping curved neon arc 2 (counter-rotating) */}
              <circle
                cx="250" cy="250" r="165"
                stroke="url(#curveGrad2)"
                strokeWidth="2"
                strokeDasharray="90 180"
                strokeLinecap="round"
                filter="url(#glowFilter)"
                className="anim-spin-reverse"
              />

              {/* Layer 4: Diagonal Elliptical Tech Orbit */}
              <ellipse
                cx="250" cy="250" rx="230" ry="110"
                stroke="rgba(0, 223, 130, 0.22)"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                transform="rotate(-25 250 250)"
                className="anim-spin-slow-alt"
              />

              {/* Layer 5: Concentric inner precision ring */}
              <circle
                cx="250" cy="250" r="138"
                stroke="rgba(0, 223, 130, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="anim-spin-medium"
              />

              {/* Layer 6: Dynamic accent ticks & curves */}
              <path
                d="M 250 35 A 215 215 0 0 1 435 150"
                stroke="url(#accentGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glowFilter)"
              />
              <path
                d="M 250 465 A 215 215 0 0 1 65 350"
                stroke="url(#accentGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glowFilter)"
              />
            </svg>

            {/* Floating Orbital Node Badges */}
            <div className="hero-orbital-satellites">
              <div className="orbit-node node-code">
                <span>&lt;code /&gt;</span>
              </div>
              <div className="orbit-node node-year">
                <span>2026-27</span>
              </div>
              <div className="orbit-node node-domain">
                <span>GFG PHCET</span>
              </div>
            </div>

            {/* Central Pure Borderless Floating Logo */}
            <div className="hero-logo-pure-container">
              <img
                src="/assets/gfg_phcet_logo_clean.png"
                alt="GFG PHCET Official Chapter Emblem"
                className="hero-logo-pure-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section: strictly HoD, Teacher Incharge, and Campus Mantri */}
      <section id="leadership" className="section leadership-section">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} />
            <span>Chapter Pillars</span>
          </div>
          <h2 className="section-title">Faculty &amp; Campus Leadership</h2>
          <p className="section-desc">
            The visionary leaders steering GFG PHCET toward academic excellence and campus-wide innovation.
          </p>
        </div>

        {/* 3 Leadership Cards with authentic ID Card Cyber styling */}
        <div className="team-grid leadership-grid">
          {leadershipMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="section-center-action">
          <Link to="/team" className="btn-primary team-cta-large">
            <Users size={17} />
            <span>Explore All 21 Team Members</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Interactive Chapter Domains / Pillars Section */}
      <section className="section domains-overview-section">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Operational Domains</span>
          </div>
          <h2 className="section-title">Engineered Across 6 Key Domains</h2>
          <p className="section-desc">
            Every department functions as a synchronized unit to conduct hackathons, manage competitive programming tracks, build community projects, and foster student leadership.
          </p>
        </div>

        <div className="domains-grid">
          <div className="domain-feature-card">
            <div className="domain-card-icon">
              <Terminal size={22} />
            </div>
            <h3 className="domain-card-title">Technical &amp; Coding</h3>
            <p className="domain-card-desc">
              Competitive coding tracks, DSA problem sets, hackathon mentoring, and open-source project development.
            </p>
            <div className="domain-card-meta">
              <span>C++ &middot; Python &middot; DSA &middot; Fullstack</span>
            </div>
          </div>

          <div className="domain-feature-card">
            <div className="domain-card-icon">
              <Cpu size={22} />
            </div>
            <h3 className="domain-card-title">Design &amp; Creative</h3>
            <p className="domain-card-desc">
              Visual brand identity, digital ID cards, event graphics, UI/UX prototyping, and marketing aesthetics.
            </p>
            <div className="domain-card-meta">
              <span>Figma &middot; UI/UX &middot; 3D &middot; Motion</span>
            </div>
          </div>

          <div className="domain-feature-card">
            <div className="domain-card-icon">
              <Layers size={22} />
            </div>
            <h3 className="domain-card-title">Events &amp; Operations</h3>
            <p className="domain-card-desc">
              Logistics, stage management, guest speaker coordination, and seamless execution of high-octane campus tech events.
            </p>
            <div className="domain-card-meta">
              <span>Logistics &middot; Operations &middot; TechFests</span>
            </div>
          </div>

          <div className="domain-feature-card">
            <div className="domain-card-icon">
              <Users size={22} />
            </div>
            <h3 className="domain-card-title">PR &amp; Social Outreach</h3>
            <p className="domain-card-desc">
              Chapter branding, student engagement, cross-college collaborations, and digital media presence across platforms.
            </p>
            <div className="domain-card-meta">
              <span>LinkedIn &middot; Instagram &middot; Outreach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Landing Footer */}
      <footer className="minimal-landing-footer">
        <div className="minimal-footer-inner">
          <div className="minimal-footer-brand">
            <span className="footer-logo-dot" />
            <span className="minimal-brand-name">GFG PHCET</span>
            <span className="minimal-footer-sep">&bull;</span>
            <span className="minimal-college-name">Pillai HOC College of Engineering &amp; Technology</span>
          </div>

          <div className="minimal-footer-meta">
            <span>Tenure 2026&ndash;2027</span>
            <span className="minimal-footer-sep">&bull;</span>
            <Link to="/team" className="minimal-footer-link">Meet the Team</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
