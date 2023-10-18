import Image from "next/image";


type NFTItem = {
    image: string;
    name: string;
    description: string;
    date: string
}
export default function ProfileNFTItem(
    {item} : {item: NFTItem}
) {
  return (
    <div>
        <Image src={item.image} width={500} height={500} alt="something"/>
        <div>
            <h5>{item.name}</h5>
            <span>{item.description}</span>
            <span>{item.date}</span>
        </div>
    </div>
  )
}
