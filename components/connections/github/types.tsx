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
  }
  