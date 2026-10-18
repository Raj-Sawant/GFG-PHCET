import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Member } from '../types/member';
import { LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from './SocialIcons';
import { ArrowRight } from 'lucide-react';

interface Props {
  member: Member;
  viewMode?: 'standard' | 'idcard';
}

export default function MemberCard({ member, viewMode = 'standard' }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const emailAddress = member.email || '';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
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

  // ── ID Card showcase view (explicit idcard tab on Team page) ──────────────
  if (viewMode === 'idcard' && member.idCardImage) {
    return (
      <div
        ref={cardRef}
        className="id-card-showcase-item"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/member/${member.slug}`} className="id-card-frame-link" title={`View ${member.name}'s Profile`}>
          <div className="id-card-glare" />
          <img
            src={member.idCardImage}
            alt={`${member.name} Official ID Card`}
            className="id-card-showcase-img"
            loading="eager"
            decoding="async"
          />
          <div className="id-card-overlay-actions">
            <span className="btn-primary id-card-view-btn">
              <span>View Profile</span>
              <ArrowRight size={14} />
            </span>
          </div>
        </Link>
        <div className="id-card-footer-strip">
          <div className="id-card-footer-info">
            <div className="id-card-footer-name">{member.name}</div>
            <div className="id-card-footer-role">{member.title || member.position}</div>
          </div>
          <Link to={`/member/${member.slug}`} className="card-view-btn" title="View Profile">
            <span>Profile</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Standard card view ─────────────────────────────────────────────────────
  // Show official ID card image in photo box if available (for both students and faculty).
  const cardImage = member.idCardImage || member.avatar;

  return (
    <div
      ref={cardRef}
      className={`member-card id-card-style${isFaculty ? ' faculty-card' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Photo – official ID card image when available, fallback to circular badge if not */}
      <Link to={`/member/${member.slug}`} className="member-card-photo-box" style={{ textDecoration: 'none' }}>
        {member.idCardImage ? (
          /* Use official ID card PNG (exact design from PDF) */
          <div className="student-portrait-container">
            <img
              className="member-card-idcard-img"
              src={member.idCardImage}
              alt={`${member.name} GFG PHCET ID Card`}
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=500`;
              }}
            />
          </div>
        ) : isFaculty ? (
          <div className="faculty-badge-frame">
            <img
              className="faculty-card-img"
              src={member.avatar}
              alt={member.name}
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=500`;
              }}
            />
          </div>
        ) : (
          <div className="student-portrait-container">
            <img
              className="member-card-idcard-img"
              src={cardImage}
              alt={`${member.name} GFG PHCET ID Card`}
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=500`;
              }}
            />
          </div>
        )}

        {/* Domain Badge – shown only on fallback cards without embedded ID graphics */}
        {!member.idCardImage && (
          <div className="member-card-badge">
            <span className="badge-dot" style={{ background: member.coverColor || '#00df82' }} />
            <span>{member.domain}</span>
          </div>
        )}
      </Link>

      {/* Card footer: name, role, socials, profile link */}
      <div className="member-card-content">
        <Link to={`/member/${member.slug}`} style={{ textDecoration: 'none' }}>
          <h3 className="member-card-name">{member.name}</h3>
          <div className="member-card-role">{member.title || member.position}</div>
        </Link>

        <div className="member-card-handles">
          <div className="card-social-group">
            <a
              href={member.linkedin || ''}
              target={member.linkedin ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`handle-btn linkedin${!member.linkedin ? ' disabled-link' : ''}`}
              title={member.linkedin ? "LinkedIn" : "LinkedIn not provided"}
              onClick={(e) => {
                if (!member.linkedin) e.preventDefault();
                e.stopPropagation();
              }}
            >
              <LinkedInIcon size={14} />
            </a>
            {!isFaculty && (
              <a
                href={member.github || ''}
                target={member.github ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`handle-btn github${!member.github ? ' disabled-link' : ''}`}
                title={member.github ? "GitHub" : "GitHub not provided"}
                onClick={(e) => {
                  if (!member.github) e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <GithubIcon size={14} />
              </a>
            )}
            {!isFaculty && member.instagram && (
              <a
                href={member.instagram || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="handle-btn instagram"
                title="Instagram"
                onClick={(e) => e.stopPropagation()}
              >
                <InstagramIcon size={14} />
              </a>
            )}
            <a
              href={emailAddress ? `mailto:${emailAddress}` : ''}
              className={`handle-btn email${!emailAddress ? ' disabled-link' : ''}`}
              title={emailAddress ? `Email ${member.name}` : 'Email not provided'}
              onClick={(e) => {
                if (!emailAddress) e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MailIcon size={14} />
            </a>
          </div>

          <Link to={`/member/${member.slug}`} className="card-view-btn" title="View Profile">
            <span>Profile</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
