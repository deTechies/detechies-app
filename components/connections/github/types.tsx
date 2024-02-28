export interface Repository {
    name: string;
    description: string;
    updatedAt: string;
    owner: {
      login: string;
    };
  }
  export interface Dependency {
    name: string;
    version: string;
  }
  
  
  export interface LanguagePercentage {
    name: string;
    percentage: number;
  }