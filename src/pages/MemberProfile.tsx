import { useParams, Navigate } from 'react-router-dom';
import { memberPages } from '../members';
import { getMemberBySlug, members } from '../data/members';
import MemberProfileLayout from '../components/MemberProfileLayout';

export default function MemberProfile() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/team" replace />;

  // 1. Render dedicated standalone member component from registry if present
  const DedicatedMemberPage = memberPages[slug];
  if (DedicatedMemberPage) {
    return <DedicatedMemberPage />;
  }

  // 2. Fallback to dynamic data lookup
  const member = getMemberBySlug(slug);
  if (!member) return <Navigate to="/team" replace />;

  const currentIndex = members.findIndex((m) => m.slug === member.slug);
  const prevMember = currentIndex > 0 ? members[currentIndex - 1] : members[members.length - 1];
  const nextMember = currentIndex < members.length - 1 ? members[currentIndex + 1] : members[0];

  return (
    <MemberProfileLayout
      member={member}
      prevMember={prevMember}
      nextMember={nextMember}
    />
  );
}
