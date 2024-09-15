// AddRating.tsx

"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";

import { Rating } from "@mui/material";

import axios from "axios";
import { watch } from "fs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ListType } from "./ListRating";
// types.ts

export interface SafeUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  playListId: string;
  rating: number;
  comment: string;
  createdDate: Date;
}

interface AddRatingProps {
  list: ListType;
  user: SafeUser | null;
}

const AddRating: React.FC<AddRatingProps> = ({ list, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: "0",
    },
  });
  const rating = watch("rating");
  const setCustomValue = (id: string, value: number | null) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.rating === "0") {
      setIsLoading(false);
      return toast.error("No rating selected ", { id: "rating" });
    }

    const ratingData = {
      ...data,
      playListId: list.id,
      userId: user?.id,
    };

    try {
      await axios.post("/api/rating", ratingData);
      router.refresh();
      reset();
      toast.success("Rating submitted", { id: "submitted" });
    } catch (error) {
      toast.error("Something went wrong", { id: "ratingError" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !list) return null;

  const userReview = list.reviews.find(
    (review: Review) => review.userId === user.id
  );
  if (userReview) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this Playlist" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
        value={Number(rating) || null}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        disabled={isLoading}
        label={isLoading ? "Loading" : "Rate Playlist"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
