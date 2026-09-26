import { useState, useMemo, useRef, useEffect } from 'react';
import MemberCard from '../components/MemberCard';
import { members } from '../data/members';
import {
  Users,
  Search,
  IdCard,
  X,
  Filter,
  ChevronDown,
  Check,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Leadership',
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isFilterOpen]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: members.length };
    CATEGORIES.forEach((cat) => {
      if (cat === 'All') return;
      if (cat === 'Leadership') {
        counts[cat] = members.filter(
          (m) =>
            m.domain === 'Leadership' ||
            m.domain === 'Campus Mantri' ||
            m.position.toLowerCase().includes('lead') ||
            m.position.toLowerCase().includes('campus mantri')
        ).length;
      } else {
        counts[cat] = members.filter((m) => m.domain === cat).length;
      }
    });
    return counts;
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // Category filter
      let matchCat = true;
      if (activeCategory === 'Leadership') {
        matchCat =
          m.domain === 'Leadership' ||
          m.domain === 'Campus Mantri' ||
          m.position.toLowerCase().includes('lead') ||
          m.position.toLowerCase().includes('campus mantri');
      } else if (activeCategory !== 'All') {
        matchCat = m.domain === activeCategory;
      }

      // Search filter
      let matchSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = m.name.toLowerCase().includes(query);
        const inPosition = m.position.toLowerCase().includes(query);
        const inDomain = m.domain.toLowerCase().includes(query);
        const inDept = m.department ? m.department.toLowerCase().includes(query) : false;
        const inSkills = m.skills ? m.skills.some((s) => s.toLowerCase().includes(query)) : false;
        matchSearch = inName || inPosition || inDomain || inDept || inSkills;
      }

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="team-page-wrapper">
      {/* Team Header Section */}
      <section className="team-header-section">
        <div className="section-tag team-header-badge">
          <IdCard size={14} />
          <span>Official Chapter Registry &middot; 2026-27</span>
        </div>

        <h1 className="team-page-title">
          Meet the <span>GFG PHCET Team</span>
        </h1>
      </section>

      {/* Control Bar: Search & View Switcher */}
      <section className="team-controls-section">
        <div className="team-controls-bar">
          {/* Search Input */}
          <div className="team-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search member, role, domain, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="team-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile Filter Dropdown Toggle Button */}
          <div className="filter-dropdown-wrapper mobile-only" ref={filterDropdownRef}>
            <button
              type="button"
              className={`filter-dropdown-toggle-btn${isFilterOpen ? ' active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-haspopup="listbox"
              aria-expanded={isFilterOpen}
            >
              <div className="filter-dropdown-left">
                <Filter size={16} className="filter-svg-icon" />
                <span className="filter-selected-label">{activeCategory}</span>
                <span className="filter-selected-count">{categoryCounts[activeCategory] || 0}</span>
              </div>
              <ChevronDown size={16} className={`filter-chevron${isFilterOpen ? ' open' : ''}`} />
            </button>

            {/* Mobile Filter Menu Popover */}
            {isFilterOpen && (
              <div className="filter-dropdown-menu" role="listbox">
                {CATEGORIES.map((cat) => {
                  const count = categoryCounts[cat] || 0;
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`filter-menu-item${isSelected ? ' selected' : ''}`}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                    >
                      <div className="filter-menu-item-left">
                        <span className="filter-menu-name">{cat}</span>
                        <span className="filter-menu-count">{count}</span>
                      </div>
                      {isSelected && <Check size={15} className="filter-menu-check" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Filter Categories Chips */}
        <div className="filter-container desktop-only">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                className={`filter-chip${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
                {count > 0 && <span className="chip-count">{count}</span>}
              </button>
            );
          })}
        </div>

        {/* Filter results status indicator */}
        <div className="filter-status-indicator">
          <span>Showing <strong>{filteredMembers.length}</strong> of {members.length} members</span>
          {activeCategory !== 'All' && (
            <span className="filter-badge-active">
              Category: {activeCategory}
            </span>
          )}
          {searchQuery && (
            <span className="filter-badge-active">
              Search: "{searchQuery}"
            </span>
          )}
        </div>
      </section>

      {/* Members Grid adhering to ID Card design */}
      <section className="team-grid-section">
        {filteredMembers.length === 0 ? (
          <div className="team-empty-state">
            <Users size={48} className="empty-icon" />
            <h3 className="empty-title">No members found</h3>
            <p className="empty-desc">
              We couldn't find any team member matching "{searchQuery}". Try searching by another name, domain, or role.
            </p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="team-grid">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
