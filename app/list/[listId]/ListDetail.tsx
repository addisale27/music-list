"use client";
import { Rating } from "@mui/material";
import ListImage from "./ListImage";
import { useState } from "react";
import Button from "@/app/components/Button";
import { MdDelete, MdRefresh } from "react-icons/md";
import { Review, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/utils/firebaseConfig";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";

interface ListDetailsProps {
  list: ListType;
  isOwner: boolean;
}
export type ListType = {
  id: string;
  title: string;
  album: string;
  genre: string;
  artist: string;
  releasedYear: string;
  selectedImage: string;
  description: string;
  images: string[];
  reviews: Review[] & {
    user: User;
  };
};

const ListDetail: React.FC<ListDetailsProps> = ({ list, isOwner }) => {
  const rating =
    list.reviews.reduce(
      (acc: number, review: Review) => (acc += review.rating),
      0
    ) / list.reviews.length;
  const Horizontal = () => {
    return <hr className="w-[30%] my-2" />;
  };
  const [listState, setListState] = useState<Partial<ListType>>({
    id: list.id,
    title: list.title,
    artist: list.artist,
    album: list.album,
    genre: list.genre,
    releasedYear: list.releasedYear,
    selectedImage: list.images[0],
  });
  const handleImageChange = (value: string) => {
    setListState((prev) => {
      return { ...prev, selectedImage: value };
    });
  };
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleImageDelete = async (images: string[]) => {
    try {
      setIsLoading(true);
      for (const image of images) {
        if (image) {
          const imageRef = ref(storage, image);
          await deleteObject(imageRef);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleDeleteList = async (id: string, images: string[]) => {
    toast("Deleting playlist, please wait...", { id: "deleting" });
    try {
      setIsLoading(true);
      await handleImageDelete(images);
      console.log("image deleted from firebase");
      await axios.delete(`/api/create/${id}`);
      toast.success("PlayList has been deleted", { id: "deleted" });
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ListImage
        list={list}
        listState={listState}
        handleImageChange={handleImageChange}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-md">
        <h2 className="font-bold text-3xl text-slate-700">{list.title}</h2>
        <Horizontal />
        <div className="flex gap-2 items-start max-w-[600px]">
          <span className="font-semibold text-xl col-span-2 ">
            Description:{" "}
          </span>
          <span className="col-span-5">{list.description}</span>
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
        {isOwner && (
          <div className=" max-w-[400px] flex gap-4">
            <Button
              icon={MdRefresh}
              label="Edit"
              small
              onClick={() => {
                router.push(`/updateList/${listState.id}`);
              }}
            />
            <Button
              icon={MdDelete}
              label="Delete"
              small
              onClick={() => {
                handleDeleteList(listState.id, listState.images);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDetail;
