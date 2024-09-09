"use client";

import Image from "next/image";
import { ListType } from "./ListDetail";

interface ListImageProps {
  list: ListType;
  listState: Partial<ListType>;
  handleImageChange: (value: string) => void;
}
const ListImage: React.FC<ListImageProps> = ({
  list,
  listState,
  handleImageChange,
}) => {
  return (
    <div className="grid grid-rows-5 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="row-span-4 relative w-full ">
        <Image
          fill
          src={listState.selectedImage}
          alt={listState.title}
          className="w-full h-full object-contain  max-h-[400px] min-h-[200px] sm:min-h-[300px]"
          quality={100}
        />
      </div>
      <div className="row-span-1 flex items-center justify-center border-[1.25px] border-slate-200 gap-4">
        {list.images.map((image: string) => {
          return (
            <div
              key={image}
              onClick={() => handleImageChange(image)}
              className={`relative h-[80%] aspect-square rounded border-teal-500 ${
                image === listState.selectedImage
                  ? `border-[1.5px]`
                  : `border-none`
              }`}
            >
              <Image
                fill
                src={image}
                alt="images"
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListImage;
