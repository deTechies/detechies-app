// we want to add in the abis and the contracts in here to make sure that we can build the contracts

import { Address } from "wagmi";
import groupRegistry from "./abi/groupRegistry.abi.json";
const MUMBAI = {
    groupRegistry: "0x92b09b4b7e36bfc5111e222694877af4a17cef5f" as Address // GroupRegistry
}

const ABI = {
    groupRegistry: groupRegistry  
}


export { ABI, MUMBAI };
