import Image from "next/image";
interface ImageGalleryProps {
  imagesMetadata: any[];
    selectedImage: string | null | undefined;
    onSelectImage: (image: string) => void;
  }
  
export const ImageGallery = ({ imagesMetadata, selectedImage, onSelectImage } : ImageGalleryProps) => {
    return (
      <div className="flex flex-col gap-4 h-[200px] w-[100px] overflow-auto">
        {imagesMetadata.map((item, index) => (
          <div
            key={index}
            className={`relative w-full bg-background-layer-2 border rounded-sm ${
              selectedImage === item.image ? "border-accent-primary" : "border-border-div"
            }`}
            onClick={() => onSelectImage(item.image)}
          >
            <Image src={item.image} alt="Character" layout="responsive" width={1} height={1} />
          </div>
        ))}
      </div>
    );
  };
  