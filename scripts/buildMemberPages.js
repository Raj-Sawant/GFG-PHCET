import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const membersDir = path.join(rootDir, 'src', 'members');

// Read current members list from src/data/members.ts by running a node require or parsing
// We can import members directly using standard JSON
const membersTsPath = path.join(rootDir, 'src', 'data', 'members.ts');
const membersTsContent = fs.readFileSync(membersTsPath, 'utf8');

// Extract json array
const jsonMatch = membersTsContent.match(/export const members: Member\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error("Could not parse members array from members.ts");
  process.exit(1);
}

const allMembers = JSON.parse(jsonMatch[1]);
console.log(`Loaded ${allMembers.length} members from members.ts`);

allMembers.forEach(member => {
  const slug = member.slug;
  const memberFolder = path.join(membersDir, slug);
  if (!fs.existsSync(memberFolder)) {
    fs.mkdirSync(memberFolder, { recursive: true });
  }

  // 1. Write data.ts
  const dataTsContent = `import type { Member } from '../../types/member';

export const memberData: Member = ${JSON.stringify(member, null, 2)};
export default memberData;
`;
  fs.writeFileSync(path.join(memberFolder, 'data.ts'), dataTsContent, 'utf8');

  // Convert slug to PascalCase
  const componentName = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('') + 'Page';

  // 2. Write symmetric, professional index.tsx
  const pageTsxContent = `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Share2, Check, 
  Building, Award, Star 
} from 'lucide-react';
import { memberData } from './data';
import { members } from '../../data/members';
import { LinkedInIcon, GithubIcon, InstagramIcon, MailIcon } from '../../components/SocialIcons';

export const ${componentName}: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentIndex = members.findIndex(m => m.slug === memberData.slug);
  const prevMember = currentIndex > 0 ? members[currentIndex - 1] : members[members.length - 1];
  const nextMember = currentIndex < members.length - 1 ? members[currentIndex + 1] : members[0];

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
              to={\`/member/\${prevMember.slug}\`} 
              className="btn-secondary" 
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              title={\`Previous: \${prevMember.name}\`}
            >
              <ChevronLeft size={15} /> Prev
            </Link>
          )}
          {nextMember && (
            <Link 
              to={\`/member/\${nextMember.slug}\`} 
              className="btn-secondary" 
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              title={\`Next: \${nextMember.name}\`}
            >
              Next <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* Symmetric Profile Layout */}
      <div className="profile-grid-symmetric">
        {/* Left Column: Identity Card */}
        <div className="profile-identity-card">
          <div className="profile-avatar-frame">
            <img 
              src={memberData.avatar} 
              alt={memberData.name} 
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  \`https://ui-avatars.com/api/?name=\${encodeURIComponent(memberData.name)}&background=00b386&color=fff&size=400\`;
              }}
            />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', margin: '0 auto 0.75rem auto' }} className="section-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: memberData.coverColor || '#00b386' }} />
            {memberData.domain}
          </div>

          <h1 style={{ fontSize: '1.45rem', marginBottom: '0.35rem' }}>{memberData.name}</h1>
          <p style={{ color: 'var(--gfg-green)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
            {memberData.position}
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            {memberData.bio}
          </p>

          {/* Social Handles in distinct style cards */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {memberData.linkedin && (
              <a 
                href={memberData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="handle-btn linkedin"
                style={{ width: 38, height: 38 }}
                title="LinkedIn"
              >
                <LinkedInIcon size={17} />
              </a>
            )}
            {memberData.github && (
              <a 
                href={memberData.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="handle-btn github"
                style={{ width: 38, height: 38 }}
                title="GitHub"
              >
                <GithubIcon size={17} />
              </a>
            )}
            {memberData.instagram && (
              <a 
                href={memberData.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="handle-btn instagram"
                style={{ width: 38, height: 38 }}
                title="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
            )}
            {memberData.email && (
              <a 
                href={\`mailto:\${memberData.email}\`} 
                className="handle-btn"
                style={{ width: 38, height: 38 }}
                title="Email"
              >
                <MailIcon size={17} />
              </a>
            )}
          </div>

          <button 
            onClick={handleShare}
            className="btn-secondary" 
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.55rem' }}
          >
            {copied ? <Check size={14} color="#00b386" /> : <Share2 size={14} />}
            <span>{copied ? 'Profile Link Copied' : 'Share Profile'}</span>
          </button>
        </div>

        {/* Right Column: Details & Key Contributions Card */}
        <div className="profile-details-card">
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building size={16} color="var(--gfg-green)" />
              <span>Official Chapter Details</span>
            </h3>

            <div>
              <div className="profile-meta-row">
                <span className="profile-meta-label">Domain</span>
                <span className="profile-meta-val" style={{ color: 'var(--gfg-green)' }}>{memberData.domain}</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-label">Position</span>
                <span className="profile-meta-val">{memberData.position}</span>
              </div>
              {memberData.year && (
                <div className="profile-meta-row">
                  <span className="profile-meta-label">Academic Year</span>
                  <span className="profile-meta-val">{memberData.year}</span>
                </div>
              )}
              <div className="profile-meta-row">
                <span className="profile-meta-label">Department</span>
                <span className="profile-meta-val">{memberData.department}</span>
              </div>
              {memberData.institution && (
                <div className="profile-meta-row">
                  <span className="profile-meta-label">Institution</span>
                  <span className="profile-meta-val">{memberData.institution}</span>
                </div>
              )}
            </div>

            <h3 style={{ fontSize: '1.1rem', marginTop: '1.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={16} color="#f59e0b" />
              <span>Key Competencies</span>
            </h3>
            <div className="skill-chips-row">
              {memberData.skills.map((skill: string) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', marginTop: '1.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} color="var(--gfg-green)" />
              <span>Key Highlights</span>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {memberData.achievements.map((ach: string, idx: number) => (
                <li key={idx} style={{ fontSize: '0.86rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gfg-green)' }} />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ${componentName};
`;
  fs.writeFileSync(path.join(memberFolder, 'index.tsx'), pageTsxContent, 'utf8');
});

// Update src/members/index.ts registry
const registryImports = allMembers.map(m => {
  const compName = m.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
  return `import ${compName} from './${m.slug}';`;
}).join('\n');

const registryMap = allMembers.map(m => {
  const compName = m.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
  return `  '${m.slug}': ${compName},`;
}).join('\n');

const registryTsContent = `import React from 'react';
${registryImports}

export const memberPages: Record<string, React.FC> = {
${registryMap}
};

export default memberPages;
`;

fs.writeFileSync(path.join(membersDir, 'index.ts'), registryTsContent, 'utf8');

console.log(`Generated symmetric professional pages for all ${allMembers.length} members!`);
