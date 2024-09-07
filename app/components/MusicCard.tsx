"use client";

import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

import { truncateText } from "../utils/trancateText";
import { useRouter } from "next/navigation";

interface MusicCardProps {
  list: any;
}
const MusicCard: React.FC<MusicCardProps> = ({ list }) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer col-span-1 border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105  text-sm mt-7 gap-4"
      onClick={() => {
        router.push(`list/${list.id}`);
      }}
    >
      <div className="flex flex-col w-full  gap-2">
        <div className="aspect-square overflow-hidden relative w-full mb-4">
          <Image
            fill
            src={list.images[0].url}
            alt={list.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="">
          <span className="font-semibold">Music title: </span>
          <span> {truncateText(list.title)}</span>
        </div>
        <div>
          <span className="font-semibold">Album: </span>
          <span>{truncateText(list.album)}</span>
        </div>
        {/* <div>
          <Rating value={rating} readOnly />
        </div> */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="font-semibold">{list.reviews.length} </span>
            review(s)
            <span></span>
          </div>
          <div className="flex gap-2 items-center justify-self-end">
            {/* //if the current user likes the list before make the heart red
          otherwiese empty heart */}
            <span className="text-2xl text-slate-400">
              <AiOutlineHeart />
            </span>
            <span>{list.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
