// we want to add in the abis and the contracts in here to make sure that we can build the contracts

import { Address } from "wagmi";
import group from "./abi/group.abi.json";
import groupRegistry from "./abi/groupRegistry.abi.json";
import profile from "./abi/profile.abi.json";
import project from "./abi/project.abi.json";
import projectRegistry from "./abi/projectRegistry.abi.json";
const MUMBAI = {
    groupRegistry: "0xbdb946fd58e083abed65ccfddc8d2bdb3662a1a7" as Address,
    projectRegistry: "0x1Cf9a47f91DccA1D18184203C73B0f3988b38e3c" as Address,
    profile: "0xee044eC69DEFAc105376ee55C0BE458B5D843045" as Address,
}

const ABI = {
    groupRegistry: groupRegistry as any,
    projectRegsitry: projectRegistry as any,
    project: project as any,
    group: group as any,
    profile: profile as any,
}

export const API_URL = process.env.NEXT_PUBLIC_API || 'https://staging.careerbadge.online' || 'https://api.careerbadge.online'
// export const API_URL = process.env.NEXT_PUBLIC_API || 'http://192.168.0.3:4000'


export const defaultAvatar = [
    "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
    "bafkreidlzc4pnszwiyx73yqlbwgkchyuendxkfq63sp54vhnky3ruti5xu",
    "bafkreihdqgem6jwebjyiahy6e4mgf5xdrqam3yaxq2ki2ew4hw6tjxq7du",
    "bafkreigjctpasi7b2ytsn7mx47wjobnqkvioi4vllg7dqwzzvw7u2lijme",
    "bafkreif6oi5pwrjzey5q4pmyd3zck6a53uoefozxydapiipgq2flsbldsi", 
    "bafkreiabd3cfto7a7tjwgr5zikce476jxeeekmeif357t7v3g64uolgose",
  ];

export const DEFAULT_IPFS_URL = "https://ipfs.io/ipfs/";
export const DEFAULT_AVATAR_LINK = "/images/developer.png";
export { ABI, MUMBAI };
