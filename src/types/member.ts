export type MemberRole = 'faculty' | 'management' | 'student';
export type MemberYear = 'SE' | 'TE' | 'BE' | 'Faculty' | 'HoD';

export interface Member {
  id: string;
  slug: string;
  name: string;
  role: MemberRole;
  title: string;
  department: string;
  year?: MemberYear;
  domain: string;
  position: string;
  institution?: string;
  bio: string;
  skills: string[];
  email?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  achievements: string[];
  avatar: string; // stock image URL
  coverColor: string;
  idCardImage?: string;
}
