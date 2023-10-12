// we want to add in the abis and the contracts in here to make sure that we can build the contracts

import { Address } from "wagmi";
import groupRegistry from "./abi/groupRegistry.abi.json";
import projectRegistry from "./abi/projectRegistry.abi.json";
const MUMBAI = {
    groupRegistry: "0x92b09b4b7e36bfc5111e222694877af4a17cef5f" as Address,
    projectRegistry: "0x618880Ee2538C904eC4d66f5d7D1163DD111E522" as Address 
}

const ABI = {
    groupRegistry: groupRegistry as any,
    projectRegsitry: projectRegistry as any
}


export { ABI, MUMBAI };
