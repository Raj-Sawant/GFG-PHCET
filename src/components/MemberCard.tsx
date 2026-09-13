import { Link } from 'react-router-dom';
import type { Member } from '../types/member';
import { LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from './SocialIcons';
import { ArrowRight } from 'lucide-react';

interface Props {
  member: Member;
}

export default function MemberCard({ member }: Props) {
  const emailAddress = member.email || `${member.slug.replace(/-/g, '.')}@phcet.ac.in`;

  return (
    <div className="member-card">
      <Link to={`/member/${member.slug}`} className="member-card-photo-box" style={{ textDecoration: 'none' }}>
        <img
          className="member-card-img"
          src={member.avatar}
          alt={member.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00b386&color=fff&size=500`;
          }}
        />
        <div className="member-card-badge">
          <span className="badge-dot" style={{ background: member.coverColor || '#00b386' }} />
          <span>{member.domain}</span>
        </div>
      </Link>

      <div className="member-card-content">
        <Link to={`/member/${member.slug}`} style={{ textDecoration: 'none' }}>
          <h3 className="member-card-name">{member.name}</h3>
          <div className="member-card-role">{member.position}</div>
        </Link>
        <p className="member-card-bio">{member.bio}</p>

        {/* Social Handles including Email on all cards */}
        <div className="member-card-handles">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="handle-btn linkedin"
              title="LinkedIn"
            >
              <LinkedInIcon size={14} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="handle-btn github"
              title="GitHub"
            >
              <GithubIcon size={14} />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="handle-btn instagram"
              title="Instagram"
            >
              <InstagramIcon size={14} />
            </a>
          )}
          <a
            href={`mailto:${emailAddress}`}
            className="handle-btn email"
            title={`Email ${member.name} (${emailAddress})`}
          >
            <MailIcon size={14} />
          </a>

          <Link to={`/member/${member.slug}`} className="card-view-btn" title="View Profile">
            <span>Profile</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
