import React from 'react';
import { memberData } from './data';
import { members } from '../../data/members';
import MemberProfileLayout from '../../components/MemberProfileLayout';

export const SharwariShindePage: React.FC = () => {
  const currentIndex = members.findIndex((m) => m.slug === memberData.slug);
  const prevMember = currentIndex > 0 ? members[currentIndex - 1] : members[members.length - 1];
  const nextMember = currentIndex < members.length - 1 ? members[currentIndex + 1] : members[0];

  return (
    <MemberProfileLayout
      member={memberData}
      prevMember={prevMember}
      nextMember={nextMember}
    />
  );
};

export default SharwariShindePage;
