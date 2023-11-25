// types.ts
export interface AvatarData {
    data: number | null;
    tba: any;  // Define a more precise type if possible
  }
  
  export interface MintData {
    minting: boolean;
    mint: () => void;
    isLoading: boolean;
    mintingStatus: { hash: string } | null;
  }
  