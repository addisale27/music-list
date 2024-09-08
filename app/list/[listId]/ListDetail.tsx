"use client";

import { Rating } from "@mui/material";
import ListImage from "./ListImage";
import { useState } from "react";
import Button from "@/app/components/Button";

interface ListDetailsProps {
  list: any;
}
export type ListType = {
  id: string;
  title: string;
  album: string;
  genre: string;
  artist: string;
  releasedYear: string;
  selectedImage: ImageType;
};
export type ImageType = {
  url: string;
};
const ListDetail: React.FC<ListDetailsProps> = ({ list }) => {
  const rating =
    list.reviews.reduce(
      (acc: number, review: any) => (acc += review.rating),
      0
    ) / list.reviews.length;
  const Horizontal = () => {
    return <hr className="w-[30%] my-2" />;
  };
  const [listState, setListState] = useState<ListType>({
    id: list.id,
    title: list.title,
    artist: list.artist,
    album: list.album,
    genre: list.genre,
    releasedYear: list.releasedYear,
    selectedImage: { ...list.images[0] },
  });
  const handleImageChange = (value: ImageType) => {
    setListState((prev) => {
      return { ...prev, selectedImage: value };
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
      <ListImage
        list={list}
        listState={listState}
        handleImageChange={handleImageChange}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-md">
        <h2 className="font-bold text-3xl text-slate-700">{list.title}</h2>
        <Horizontal />
        <div className="grid grid-cols-7 ">
          <span className="font-semibold text-xl col-span-2 ">
            Description:{" "}
          </span>
          <span className="col-span-5 ml-[-25px]">{list.description}</span>
        </div>
        <Horizontal />
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-xl ">Artist: </span>
          <span>{list.artist}</span>
        </div>
        <Horizontal />
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-xl ">Album: </span>
          <span>{list.album}</span>
        </div>
        <Horizontal />
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-xl ">Genre: </span>
          <span>{list.genre}</span>
        </div>
        <Horizontal />
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-xl ">Year: </span>
          <span>{list.releasedYear}</span>
        </div>
        <Horizontal />
        <div className="flex items-center gap-2">
          <Rating value={rating} readOnly />
          <span>{list.reviews.length} reviews</span>
        </div>
        <Horizontal />
        <div className=" max-w-[400px] flex justify-between">
          <Button label="Edit" small onclick={() => {}} custom="w-[100px]" />
          <Button label="Delete" small onclick={() => {}} custom="w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
