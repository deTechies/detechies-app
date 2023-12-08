
export interface User {
    id: string;
    email: string;
    wallet: string;
    credits: number;
    display_name: string;
    verified: boolean;
    login_method: 'metamask'|'web3auth'
  }
  
  export interface ProfileDetails {
    id: number;
    full_name: string;
    country: string;
    description: string;
    app_settings: UserSettings;
  }
  
  export interface UserSettings {
    theme: 'light' | 'dark' | 'auto';
    public: boolean;
    marketing: boolean;
    payment: boolean;
  }
  
  //network interface
  export interface Network {
    id: string;
    follower: string;
    following: string;
    created_at: Date;
  }
  
  export interface CreateClub {
    name: string;
    image: string;
    type: ClubType;
    description: string;
    urls: string[];
    owner_email? : string;
  }
  
  export interface Club extends CreateClub{
    id: string;
    owner: string;
    blockchain_address?: string;
    files?: File[];
    members?: Member[];
    created_at: Date;
    updated_at?: Date;
  }
  
export enum ClubType {
    AUTHORITY = 'authority',
    EDUCATION = 'education',
    COMPANY = 'company', 
    COMMUNITY = 'community',
    OTHER = 'other'
  }
  
  export enum ProjectType {
    CLIENT = 'client',
    INTERNAL = 'internal',
    SIDE = 'side',
    HACKATHON = 'hackathon',
    OTHER = 'other'
  }
  
  export enum ContributionType {
    DEVELOPMENT = 'development',
    DESIGN = 'design',
    PRODUCT = 'product',
    MANAGEMENT = 'management',
    MARKETING = 'marketing',
    OTHER = 'other'
    
  }

  export enum ProjectCategory {
    WEB = 'web',
    MOBILE = 'mobile',
    DESIGN = 'design',
    GAME = 'game',
    OTHER = 'other'
  }
  
  export interface Member {
    id: string;
    user: string;
    role: string;
    joined_at: Date;
    verified: boolean;
  }
  
  export interface File {
    id: string;
    creator: string;
    created_at: Date;
  }
  
  export interface FileShare {
    id: string;
    file: string;
    shared_with: string;
    shared_type: 'contract' | 'user';
    created_at: Date;
  }
  
  export interface Achievement {
    id: string;
    contract: string;
    name: string;
    club: Club;
    verified: boolean;
    created_at: Date;
  }
  
  export interface AchievementReward {
    id: string;
    achievement: Achievement;
    data: string;
    collected: boolean;
    status: 'open' | 'closed' | 'pending';
    distributed: boolean;
    created_at: Date;
  }
  
  export interface CreateProject {
    name: string;
    description: string;
    image: string;
    creator?: string;
    type: ProjectType;
    begin_date: string;
    end_date?: string
    category: ProjectCategory;
    
  }
  export interface Project extends CreateProject {
    id: string;
    onchain_id: string
    isCreator: boolean;
    isMember?: boolean;
    userRole?: 'admin' | 'member' | 'client' | 'none';
    urls?: string[];
    members: User[]
    files: File[]
    achievements: Achievement[]
    created_at: Date;
    updated_at: Date;
  }
  
  
  export interface JoinProject{
    projectId: string;
    userId?: string;
    message?:string
    role?: string;
  }
  
  export interface ProjectWork {
    id: string;
    name: string;
    percentage: number;
    begin_date: string;
    end_date?: string;
    description: string;
    created_at: Date;
  }