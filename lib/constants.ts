// we want to add in the abis and the contracts in here to make sure that we can build the contracts

import { Address } from "wagmi";
import group from "./abi/group.abi.json";
import groupRegistry from "./abi/groupRegistry.abi.json";
import project from "./abi/project.abi.json";
import projectRegistry from "./abi/projectRegistry.abi.json";
const MUMBAI = {
    groupRegistry: "0x81552b688eeE0b1daBeEc3e9b6a45ff2FF062e05" as Address,
    projectRegistry: "0x1Cf9a47f91DccA1D18184203C73B0f3988b38e3c" as Address 
}

const ABI = {
    groupRegistry: groupRegistry as any,
    projectRegsitry: projectRegistry as any,
    project: project as any,
    group: group as any
}

export const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:4000'


export const defaultAvatar = [
    "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
    "bafkreidlzc4pnszwiyx73yqlbwgkchyuendxkfq63sp54vhnky3ruti5xu",
   // "bafkreihdqgem6jwebjyiahy6e4mgf5xdr am3yaxq2ki2ew4hw6tjxq7du",
    "bafkreigjctpasi7b2ytsn7mx47wjobnqkvioi4vllg7dqwzzvw7u2lijme",
    "bafkreif6oi5pwrjzey5q4pmyd3zck6a53uoefozxydapiipgq2flsbldsi", 
    "bafkreiabd3cfto7a7tjwgr5zikce476jxeeekmeif357t7v3g64uolgose",
  ];
export { ABI, MUMBAI };
