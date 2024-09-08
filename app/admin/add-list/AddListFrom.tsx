"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import SelectImage from "@/app/components/Inputs/SelectImage";
import TextArea from "@/app/components/Inputs/TextArea";
import { ImageType } from "@/app/list/[listId]/ListDetail";

import { useEffect, useReducer, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
export type LocalImageType = {
  image: File | null;
};
const AddListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<LocalImageType[]>(null);
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genre: "",
      releasedYear: "",
      description: "",
      images: [],
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);
  return (
    <>
      <Heading title="Add a playlist" />
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="artist"
        label="Artist"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="album"
        label="Album"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="genre"
        label="Genre"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="releasedYear"
        label="Released Year"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div>
        <div className="font-bold text-xl">
          Insert the Image for the playlist you can have more than one image
        </div>
        <SelectImage />
      </div>
    </>
  );
};

export default AddListForm;
