import { Address } from "viem";

export interface User {
  id: string;
  email: string;
  wallet: string;
  credits: number;
  display_name: string;
  nft: string[];
  tags: string[];
  avatar: string[];
  avatar_link: string;
  role: string;
  verified: boolean;
  profile_details: ProfileDetails;
  projects: ProjectMember[];
  clubs: ClubMember[];
  projectsCount: number;
  clubsCount: number;
  achievementsCount: number;
  achievement_rewards: AchievementReward[];
  login_method: "metamask" | "web3auth";
}

export interface SurveyResponse {
  id: string;
  user: string;
  matching: { [key: string]: number };
  evaluator: ProjectMember;
  projectWork: ProjectWork;
  status: "draft" | "closed" | "pending" | "finished" | "requested";
  answers: string[];
  created_at: Date;
  categories: { [key: string]: number }[];
}

export interface Profile {
  id: string;
  wallet: string | null;
  tba: string | null;
  email: string | null;
  display_name: string;
  credits: number;
  avatar: string[];
  avatar_link: string | null;
  login_method: string | null;
  verified: boolean;
  verification_code: number;
  created_at: string;
  updated_at: string;
  projects: {
    memberId: string;
    role: string;
    created_at: string;
    tokenId: string | null;
    level: number;
    verified: boolean;
    project: Project;
    works: ProjectWork[];
  }[];
  profile_details: {
    id: 3;
    full_name: null | string;
    profession: null | string;
    specialisation: null | string;
    description: null | string;
    skills: string;
    updated_at: string;
  };
  achievement_rewards: {
    id: string;
    data: string;
    tokenId: null | string;
    collected: boolean;
    status: "open" | "closed" | "pending" | "granted" | "requested";
    distributed: boolean;
    created_at: string;
    updated_at: string;
    receivingWallet: null | string;
    achievement: Achievement;
  }[];
  twitter?: null | string;
  kakao?: null | string;
  google?: null | string;
  bitcoin?: null | string;
  figma?: null | string;
  facebook?: null | string;
  github?: null | string;
  linkedin?: null | string;
  phone?: null | string;
  pinterest?: null | string;
  reddit?: null | string;
  telegram?: null | string;
  youtube?: null | string;
}

export interface ProfileDetails {
  id: number;
  full_name: string;
  country: string;
  profession: PROFESSION_TYPE;
  description: string;
  app_settings: UserSettings;
}

export interface UserSettings {
  theme: "light" | "dark" | "auto";
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
  owner_email?: string;
  name: string;
  image: string;
  type: GROUP_TYPE;
  description: string;
  urls: string[];
}

export interface Club extends CreateClub {
  id: string;
  owner: string;
  verified: boolean;
  contract: string;
  blockchain_address?: string;
  files?: File[];
  members?: ClubMember[];
  achievements: Achievement[];
  created_at: Date;
  updated_at?: Date;
  isUserMember?: boolean;
  userRole?: string;
}

export enum GROUP_TYPE {
  COMMUNITY = "community",
  COMPANY = "company",
  SCHOOL = "school",
  AUTHORITY = "authority",
}

export enum NFT_TYPE {
  SBT = "sbt",
  ERC721 = "erc721",
}

export enum AVATAR_TYPE {
  CLOTHES = "clothes",
  BACKGROUND = "background",
  ACCESSORY = "accessory",
  HAIR = "hair",
  FACE = "face",
  EYE = "eye",
  MOUTH = "mouth",
}

export enum SBT_TYPE {
  EDU = "edu",
  AWARDS = "awards",
}

export enum NFT_IMAGE_TYPE {
  AVATAR = "avatar",
  IMAGE = "image",
  IMAGE_AND_AVATAR = "avatar+image",
}

export enum ProjectType {
  COMPANY = "company",
  FREELANCE = "freelance",
  SIDE = "side",
}

export enum PRIVACY_TYPE {
  PUBLIC = "public",
  PRIVATE = "private",
  GROUP = "group",
}

export enum ROLE_TYPE {
  ADMIN = "admin",
  CLIENT = "client",
  MEMBER = "member",
}

export enum ContributionType {
  DEVELOPMENT = "development",
  DESIGN = "design",
  PRODUCT = "product",
  MANAGEMENT = "management",
  MARKETING = "marketing",
  OTHER = "other",
}

export enum PROFESSION_TYPE {
  DEVELOPMENT = "Developer",
  PM = "PM",
  QA_ENGINEER = "QA Engineer",
  PLANNER = "Planner",
  DESIGNER = "Designer",
}

export enum AVAILABILITY_TYPE {
  AVAILABLE = "available",
  SOON_AVAILABLE = "soon avialable",
  NOT_AVAILABLE = "not available",
}


export enum ProjectCategory {
  WEB = "web",
  MOBILE = "mobile",
  DESIGN = "design",
  GAME = "game",
  OTHER = "other",
}
export enum QuestionCategory {
  TECHNICAL = "기술 전문성",
  BUSINESS = "업무 지식",
  COMMUNICATION = "협업 및 커뮤니케이션",
  OTHER = "other",
  DELIVERY = "delivery",
}

export enum QuestionType {
  INPUT = "input",
  SLIDER = "slider",
  CIRCLES = "circles",
}

export interface ClubMember {
  created_at: Date;
  memberId: Address;
  role: string;
  user: User;
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
  shared_type: "contract" | "user";
  created_at: Date;
}

export interface Achievement {
  id: string;
  contract: string;
  nft_type: string;
  image: string;
  avatar: string;
  description: string;
  avatar_type: string | null;
  type: string;
  on_chain: boolean;
  name: string;
  club: Club;
  tokenId: string;
  verified: boolean;
  created_at: Date;
}

export interface AchievementReward {
  id: string;
  achievement: Achievement;
  project: Project;
  user: User;
  data: string;
  collected: boolean;
  status: "open" | "closed" | "pending" | "granted" | "requested";
  distributed: boolean;
  created_at: Date;
}

export interface CreateProject {
  name: string;
  description: string;
  image: string;
  creator?: string;
  avatar_type?: string;
  scope?: string;
  type: string;
  tags?: string[];
  begin_date: string;
  end_date?: string;
  category: ProjectCategory;
}
export interface Project extends CreateProject {
  projectId: string;
  id: string;
  onchain_id: string;
  isCreator: boolean;
  isMember?: boolean;
  type: string;
  userRole: string;
  urls?: string[];
  members: ProjectMember[];
  links: ProjectLink[];
  files: File[];
  achievements: Achievement[];
  created_at: Date;
  updated_at: Date;
  joined: boolean;
}

export interface ProjectLink {
  id: string;
  name: string;
  link: string;
  created_at: Date;
}

export interface ProjectMember {
  created_at: Date;
  memberId: string;
  user: User;
  percentage: number;
  role: string;
  project: Project;
  verified: boolean;
  works: ProjectWork[];
}

export interface JoinProject {
  projectId: string;
  userId?: string;
  message?: string;
  role?: string;
}

export interface ProjectWork {
  workId: string;
  name: string;
  role: PROFESSION_TYPE;
  percentage: number;
  projectMember: ProjectMember;
  tags: string[];
  begin_date: string;
  surveyResponses: SurveyResponse[];
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
  campaignId: string;
  name: string;
  club: Club;
  isMember?: boolean;
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
  campaign?: MissionDetails;
  achievement: Achievement;
  created_at: Date;
}

export interface Mission {
  missionId: string;
  name: string;
  score: number;
  essential: boolean;
}

export interface UserProgress {
  id: string;
  user: User;
  mission: Mission;
  completed: boolean;
  created_at: Date;
}
