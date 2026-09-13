import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Building, QrCode as QrIcon } from 'lucide-react';
import type { Member } from '../types/member';
import { LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from './SocialIcons';
import QrCodeModal from './QrCodeModal';

interface Props {
  member: Member;
  prevMember?: Member;
  nextMember?: Member;
}

export default function MemberProfileLayout({ member, prevMember, nextMember }: Props) {
  const [isQrOpen, setIsQrOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [member.slug]);

  return (
    <main className="profile-wrapper">
      {/* Top Bar Navigation */}
      <div className="profile-top-bar">
        <Link to="/team" className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.84rem' }}>
          <ArrowLeft size={15} /> All Members
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {prevMember && (
            <Link
              to={`/member/${prevMember.slug}`}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              title={`Previous: ${prevMember.name}`}
            >
              <ChevronLeft size={15} /> Prev
            </Link>
          )}
          {nextMember && (
            <Link
              to={`/member/${nextMember.slug}`}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              title={`Next: ${nextMember.name}`}
            >
              Next <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* Symmetric Profile Card */}
      <div className="profile-card-container">
        {/* Left Side: First the Name & Role, then the Photo */}
        <div className="profile-left-column">
          <div className="profile-left-header">
            <div className="profile-domain-pill">
              <span className="badge-dot" style={{ background: member.coverColor || '#00b386' }} />
              <span>{member.domain}</span>
            </div>
            <h1 className="profile-member-name">{member.name}</h1>
            <div className="profile-member-position">{member.position}</div>
          </div>

          <div className="profile-photo-stage">
            <img
              src={member.avatar}
              alt={member.name}
              className="profile-full-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=600`;
              }}
            />
          </div>
        </div>

        {/* Right Side: Bio, Bigger Links Buttons, Official Chapter Details */}
        <div className="profile-right-column">
          {/* Bio / About */}
          <div className="profile-bio-box">
            <div className="profile-section-label">Biography</div>
            <p className="profile-member-bio">{member.bio}</p>
          </div>

          {/* Bigger Links Buttons for all platforms */}
          <div className="profile-links-section">
            <div className="profile-section-label">Connect & Social Handles</div>
            <div className="profile-big-links-grid">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="big-link-btn linkedin"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon size={20} />
                  <span>LinkedIn</span>
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
                  <GithubIcon size={20} />
                  <span>GitHub</span>
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
                  <InstagramIcon size={20} />
                  <span>Instagram</span>
                </a>
              )}
              <a
                href={`mailto:${member.email || `${member.slug.replace(/-/g, '.')}@phcet.ac.in`}`}
                className="big-link-btn email"
                title={`Official Email (${member.email || `${member.slug.replace(/-/g, '.')}@phcet.ac.in`})`}
              >
                <MailIcon size={20} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Official Chapter Details */}
          <div className="profile-details-section">
            <h3 className="profile-details-title">
              <Building size={17} color="var(--gfg-green)" />
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
              {member.year && (
                <div className="profile-meta-row">
                  <span className="profile-meta-label">Academic Year</span>
                  <span className="profile-meta-val">{member.year}</span>
                </div>
              )}
              <div className="profile-meta-row">
                <span className="profile-meta-label">Department</span>
                <span className="profile-meta-val">{member.department}</span>
              </div>
              {member.institution && (
                <div className="profile-meta-row">
                  <span className="profile-meta-label">Institution</span>
                  <span className="profile-meta-val">{member.institution}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Single QR Code Button OUTSIDE the card */}
      <div className="profile-outside-action">
        <button
          onClick={() => setIsQrOpen(true)}
          className="btn-primary profile-qr-outside-btn"
          title="Share QR Code for this member"
        >
          <QrIcon size={19} />
          <span>Share QR Code for {member.name}</span>
        </button>
      </div>

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        member={member}
      />
    </main>
  );
}
