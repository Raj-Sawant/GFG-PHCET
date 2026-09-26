import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building,
  QrCode as QrIcon,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import type { Member } from '../types/member';
import { LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from './SocialIcons';
import QrCodeModal from './QrCodeModal';

interface Props {
  member: Member;
  prevMember?: Member;
  nextMember?: Member;
}

export default function MemberProfileLayout({
  member,
}: Props) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Always scroll to top and show smooth 3-dots transition on member load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [member.slug]);

  // 3D holographic tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--pointer-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--pointer-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--tilt-x', '0deg');
    cardRef.current.style.setProperty('--tilt-y', '0deg');
  };

  const isFaculty = member.role === 'faculty';
  const emailAddress = member.email || `${member.slug.replace(/-/g, '.')}@phcet.ac.in`;
  const studentCardImg = member.idCardImage || member.avatar;

  if (isLoading) {
    return (
      <main className="profile-wrapper profile-loader-wrapper">
        <div className="profile-dots-loader-container">
          <div className="profile-dots-glow" />
          <div className="profile-3dots">
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
          </div>
          <div className="profile-loader-badge">
            <span className="live-pulse" />
            <span>ACCESSING MEMBER DOSSIER</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-wrapper profile-loaded-fadein">
      {/* Top Bar Navigation */}
      <div className="profile-top-bar">
        <Link to="/team" className="btn-secondary profile-back-btn">
          <ArrowLeft size={15} />
          <span>All Members</span>
        </Link>
      </div>

      {/* Symmetric Profile Card */}
      <div
        ref={cardRef}
        className="profile-card-container modern-elevated-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Holographic Cursor Glare */}
        <div className="profile-holo-glare" />

        {/* Cyber HUD Corner Brackets */}
        <span className="hud-corner hud-top-left" />
        <span className="hud-corner hud-top-right" />
        <span className="hud-corner hud-bottom-left" />
        <span className="hud-corner hud-bottom-right" />

        {/* Left Side: Domain, Name, Role, and Clean ID Card from PDF */}
        <div className="profile-left-column">
          <div className="profile-left-header">
            <div className="profile-domain-pill">
              <span className="badge-dot" style={{ background: member.coverColor || '#00df82' }} />
              <span>{member.domain}</span>
            </div>
            <h1 className="profile-member-name">{member.name}</h1>
            <div className="profile-member-position">{member.position}</div>
          </div>

          {/* Photo Stage – Exact Official ID Card Image from PDF */}
          <div className={`profile-photo-stage${!isFaculty ? ' profile-id-card-stage' : ''}`}>
            {isFaculty ? (
              <div className="faculty-badge-frame large">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="faculty-card-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=600`;
                  }}
                />
                <div className="faculty-pillar-tag">
                  <ShieldCheck size={12} />
                  <span>CHAPTER PILLAR</span>
                </div>
              </div>
            ) : (
              <img
                src={studentCardImg}
                alt={`${member.name} Official GFG PHCET ID Card`}
                className="profile-id-card-full-img"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=600`;
                }}
              />
            )}
          </div>

          {/* Centered QR Button inside card: only QR SVG icon, no text */}
          <div className="profile-card-qr-row">
            <button
              type="button"
              onClick={() => setIsQrOpen(true)}
              className="profile-card-qr-btn"
              title={`Scan or Share QR for ${member.name}`}
              aria-label="Scan or Share QR Code"
            >
              <QrIcon size={20} />
            </button>
          </div>
        </div>

        {/* Right Side: Links, Chapter Details, and QR inside profile */}
        <div className="profile-right-column">
          {/* Connect & Social Handles */}
          <div className="profile-links-section">
            <div className="profile-section-label">Connect &amp; Social Handles</div>
            <div className="profile-big-links-grid">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="big-link-btn linkedin"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon size={18} />
                  <span>LinkedIn</span>
                  <ExternalLink size={12} className="link-ext-icon" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="big-link-btn github"
                  title="GitHub Profile"
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                  <ExternalLink size={12} className="link-ext-icon" />
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="big-link-btn instagram"
                  title="Instagram Profile"
                >
                  <InstagramIcon size={18} />
                  <span>Instagram</span>
                  <ExternalLink size={12} className="link-ext-icon" />
                </a>
              )}
              <a
                href={`mailto:${emailAddress}`}
                className="big-link-btn email"
                title={`Official Email (${emailAddress})`}
              >
                <MailIcon size={18} />
                <span>Email</span>
                <ExternalLink size={12} className="link-ext-icon" />
              </a>
            </div>
          </div>

          {/* Official Chapter Details */}
          <div className="profile-details-section">
            <h3 className="profile-details-title">
              <Building size={16} color="var(--gfg-emerald)" />
              <span>Official Chapter Details</span>
            </h3>

            <div className="profile-meta-grid">
              <div className="profile-meta-row">
                <span className="profile-meta-label">Domain</span>
                <span className="profile-meta-val highlight">{member.domain}</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-label">Position</span>
                <span className="profile-meta-val">{member.position}</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-label">Department</span>
                <span className="profile-meta-val">{member.department}</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-label">Tenure Period</span>
                <span className="profile-meta-val highlight">2026&ndash;2027</span>
              </div>
              <div className="profile-meta-row full-width">
                <span className="profile-meta-label">Institution</span>
                <span className="profile-meta-val">
                  Pillai HOC College of Engineering &amp; Technology (PHCET)
                </span>
              </div>
              <div className="profile-meta-row full-width">
                <span className="profile-meta-label">Credential Verification</span>
                <span className="profile-meta-val highlight" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} />
                  <span>Verified Official GFG PHCET Core Committee Member</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal (accessible when linking to the card) */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        member={member}
      />
    </main>
  );
}
