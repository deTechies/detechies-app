import Image from "next/image";
import React from "react";
interface IPFSImageLayerProps {
  hashes: string[];
  className?: string; // Array of IPFS hashes
}

const IPFSImageLayer: React.FC<IPFSImageLayerProps> = ({
  hashes,
  className,
}) => {
  if (hashes.length === 0) {
    hashes = [
      "bafybeiaxjzilfnuzw4mtt5fmzrwghgnlutaaw7ocksfg6jl2ehwa5not6q",
      "bafkreigdak4kmnojb43pvisuxc3x42bou7x2wfpfmio6gsm7hvxqgc6kpi",
      "bafkreicv5muzihhwhpsoxohw3xwuotbh4coivabol4s242mmzewtxnlmxi",
    ];
  }

  if (hashes[6]) {
    // if user has background
    const newHashes = [
      hashes[hashes.length - 1],
      ...hashes.slice(0, hashes.length - 1),
    ];

    return newHashes.map((url, index) => (
      <Image
        key={index}
        src={`https://ipfs.io/ipfs/${newHashes[index]}`}
        alt={`Layer ${url}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        className={`${
          className === "rounded-full"
            ? `rounded-full`
            : `${className}`
        }`}
        width={300}
        height={300}
        priority={true}
      />
    ));
  }

  return hashes.map((url, index) => (
    <Image
      key={index}
      src={`https://ipfs.io/ipfs/${hashes[index]}`}
      alt={`Layer ${url}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      className={`${
        className === "rounded-full"
          ? `rounded-full`
          : `rounded-sm   ${className}`
      }`}
      width={300}
      height={300}
      priority={true}
    />
  ));
};

export default IPFSImageLayer;
