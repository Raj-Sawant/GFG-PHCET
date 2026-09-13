import { Link } from 'react-router-dom';
import { ArrowRight, Users, Code2, Award, ChevronDown } from 'lucide-react';
import { getLandingPageMembers } from '../data/members';
import MemberCard from '../components/MemberCard';

export default function Home() {
  const leadershipMembers = getLandingPageMembers();

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="section-tag">
              <Code2 size={13} />
              <span>GeeksForGeeks Student Chapter</span>
            </div>

            <h1 className="hero-title">
              Where Code Meets <span>Community.</span>
            </h1>

            <p className="hero-subtitle">
              Pillai HOC College of Engineering & Technology chapter empowering engineers through competitive programming, workshops, and career advancement.
            </p>

            <div className="hero-actions">
              <Link to="/team" className="btn-primary">
                <span>Meet All Members</span>
                <ArrowRight size={15} />
              </Link>
              <a href="#leadership" className="btn-secondary">
                <span>Leadership</span>
                <ChevronDown size={15} />
              </a>
            </div>

            <div className="stats-strip">
              <div>
                <div className="stat-metric">21</div>
                <div className="stat-label">Core Members</div>
              </div>
              <div>
                <div className="stat-metric">6</div>
                <div className="stat-label">Domains</div>
              </div>
              <div>
                <div className="stat-metric">100%</div>
                <div className="stat-label">Student Driven</div>
              </div>
            </div>
          </div>

          {/* Attached Hero Image Spotlight with Revolving Orbit Animation */}
          <div className="hero-emblem-wrapper">
            {/* Ambient Background Glow */}
            <div className="hero-emblem-glow" />

            {/* Revolving Orbit Ring 1 (Clockwise) */}
            <div className="hero-orbit-ring orbit-outer">
              <div className="orbit-satellite sat-dot-1" />
              <div className="orbit-satellite sat-badge-1">
                <span>{'{ code }'}</span>
              </div>
            </div>

            {/* Revolving Orbit Ring 2 (Counter-Clockwise) */}
            <div className="hero-orbit-ring orbit-inner">
              <div className="orbit-satellite sat-dot-2" />
              <div className="orbit-satellite sat-badge-2">
                <span>GFG</span>
              </div>
            </div>

            {/* Main Circular Emblem */}
            <div className="hero-emblem-circle">
              <img
                src="/assets/gfg_phcet_logo_clean.png"
                alt="GFG PHCET Official Logo"
                className="hero-emblem-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section: strictly HoD, Teacher Incharge, and Campus Mantri */}
      <section id="leadership" className="section">
        <div className="section-header">
          <div className="section-tag">
            <Award size={13} />
            <span>Chapter Pillars</span>
          </div>
          <h2 className="section-title">Faculty & Campus Leadership</h2>
          <p className="section-desc">
            The visionary leaders steering GFG PHCET toward academic excellence and campus-wide innovation.
          </p>
        </div>

        <div className="team-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {leadershipMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/team" className="btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem' }}>
            <Users size={16} />
            <span>Explore All 21 Team Members</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
