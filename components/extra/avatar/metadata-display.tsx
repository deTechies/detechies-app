import Image from "next/image";

interface MetadataItemProps {
  name: string;
  value: string;
  image: string;
  onHover: (image: string) => void;
}

interface MetadataDisplayProps {
  metadata: any[];
  onItemHover: (image: string) => void;
}

export const MetadataDisplay = ({
  metadata,
  onItemHover,
}: MetadataDisplayProps) => {
  return (
    <div className="w-full p-4 rounded-sm grid grid-cols-2 gap-2">
      {metadata.map((item, index) => (
        /*  <MetadataItem key={index} name={item.name} value={item.description} image={item.image} onHover={onItemHover} 
          />
          */
        <div
          className="w-[64px] h-[64px] bg-background-layer-2 relative rounded-sm"
          key={index}
        >
          <Image key={index} src={item.image} alt="Character" fill={true} 
                onMouseEnter={() => onItemHover(item.image)}
                onMouseLeave={() => onItemHover("")}
          />
        </div>
      ))}
    </div>
  );
};

const MetadataItem = ({ name, value, image, onHover }: MetadataItemProps) => {
  return (
    <div
      className="grid grid-cols-1 my-2 gap-1 text-text-primary w-full hover:text-accent-primary cursor-pointer"
      onMouseEnter={() => onHover(image)}
      onMouseLeave={() => onHover("")}
    >
      <span className=" text-md hover:text-accent-primary">{name}</span>
      <span className="text-text-secondary text-sm">{value}</span>
    </div>
  );
};
