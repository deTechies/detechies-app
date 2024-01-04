
export interface User {
    id: string;
    email: string;
    wallet: string;
    credits: number;
    display_name: string;
    nft: string[];
    avatar: string;
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
    type: GROUP_TYPE;
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
  
export enum GROUP_TYPE {
    COMMUNITY = 'community',
    AGENCY = 'agency',
  }
  
  export enum NFT_TYPE{
    SBT = 'sbt', 
    ERC721 = 'erc721'
  }
  
  export enum AVATAR_TYPE {
    CLOTHES = 'clothes', 
    BACKGROUND = 'background',
    ACCESSORY = 'accessory'
  }
  
  export enum SBT_TYPE{
    EDU = 'edu', 
    AWARDS = 'awards'
  }
  export enum NFT_IMAGE_TYPE{
    AVATAR = 'avatar', 
    IMAGE = 'image', 
    IMAGE_AND_AVATAR = 'avatar+image'
  }
  
  export enum ProjectType {
    COMPANY = 'company',
    FREELANCE = 'freelance',
    SIDE = 'side'
  }
  
  export enum PrivacyType {
    ALL = 'all',
    PROJECT = 'project',
    GROUP = 'group'
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
  export enum QuestionCategory {
    TECHNICAL = '기술 전문성',
    BUSINESS = '업무 지식', 
    COMMUNICATION = '협업 및 커뮤니케이션',
    OTHER = 'other',
    DELIVERY = 'delivery'
  }
  
  export enum QuestionType {
    INPUT = 'input',
    SLIDER = 'slider',
    CIRCLES = 'circles',
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
    nft_type: string;
    image: string;
    avatar?: string;
    description:string;
    on_chain: boolean;
    name: string;
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
    scope?: string;
    type: string;
    tags?: string[];
    begin_date: string;
    end_date?: string
    category: ProjectCategory;
    
  }
  export interface Project extends CreateProject {
    id: string;
    onchain_id: string
    isCreator: boolean;
    isMember?: boolean;
    type: string;
    userRole: string;
    urls?: string[];
    members: ProjectMember[]
    files: File[]
    achievements: Achievement[]
    created_at: string;
    updated_at: string;
  }
  
  export interface ProjectMember {
    memberId: string;
    user: User;
    percentage: number;
    role: string;
    project: Project;
    verified: boolean;
    works: ProjectWork[]
  }
  
  export interface JoinProject{
    projectId: string;
    userId?: string;
    message?:string
    role?: string;
  }
  
  export interface ProjectWork {
    workId: string;
    name: string;
    percentage: number;
    tags: string[];
    begin_date: string;
    surveyResponses: any[];
    end_date?: string;
    description: string;
    created_at: Date;
  }
  
export interface Question { 
  id: string;
  type: string;
  content: string;
  category: string;
  scale: number; 
  messages?: string[];
  minText: string;
  maxText: string;
  created_at: Date;
}

export interface Survey {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  created_at: Date;
}

export interface MissionDetails {
  campaignId:string;
  name:string;
  description: string;
  begin_date: string;
  end_date: string;
  missions: Mission[];
  created_at: Date;
  achievements: MissionAchievement[];
  userProgress: UserProgress[];
}

export interface MissionAchievement {
  id: string;
  min_score: number;
  min_required: number;
  campaign?: MissionDetails
  achievement: Achievement;
  created_at: Date;
}

export interface Mission {
  missionId: string;
  name: string;
  score:number;
  essential: boolean;
}

export interface UserProgress {
  id: string;
  user: User;
  mission: Mission;
  completed: boolean;
  created_at: Date;
}