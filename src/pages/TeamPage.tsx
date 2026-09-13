import { useState } from 'react';
import MemberCard from '../components/MemberCard';
import { members } from '../data/members';
import { Users } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Executive Heads',
  'Faculty & Advisory',
  'Technical',
  'Design & Creative',
  'Event & Operations',
  'Public Relations',
  'Social Media & Promotion',
  'Documentation',
  'Finance',
];

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMembers = members.filter((m) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Executive Heads') {
      return (
        m.position.toLowerCase().includes('head') ||
        m.position.toLowerCase().includes('lead') ||
        m.position.toLowerCase().includes('treasurer')
      );
    }
    return m.domain === activeCategory;
  });

  return (
    <main style={{ paddingTop: '6.5rem', paddingBottom: '5rem' }}>
      <div className="section">
        <div className="section-header">
          <div className="section-tag">
            <Users size={13} />
            <span>Team Hierarchy</span>
          </div>
          <h1 className="section-title">All Team Members</h1>
          <p className="section-desc">
            Organized hierarchically from Department Leadership and Executive Heads to Domain Specialists.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="filter-container">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-chip${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Members Grid adhering to strict hierarchy */}
        <div className="team-grid">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}
