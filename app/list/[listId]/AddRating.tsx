"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { PlayList, Review } from "@prisma/client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  list: PlayList & {
    reviews: Review[];
  };
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
      toast.success("Rating submitted", {
        id: "submitted",
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong", {
        id: "ratingError",
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!user || !list) return null;

  const userReview = list?.reviews?.find((review: Review) => {
    return review.userId === user.id;
  });
  if (userReview) return null;
  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this playList" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        disabled={isLoading}
        label={isLoading ? `Loading` : `Rate PlayList`}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
