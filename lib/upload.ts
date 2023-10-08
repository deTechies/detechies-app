import { NFTStorage } from "nft.storage";

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN as string;
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export async function uploadContent(content: any) {

  const imageFile = new File([content], content.fileName, {
    type: content.type,
  });
  const cid = await client.storeBlob(imageFile);
  return cid;
}

