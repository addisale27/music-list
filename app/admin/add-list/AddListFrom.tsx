"use client";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import TextArea from "@/app/components/Inputs/TextArea";
import SelectImage from "@/app/components/Inputs/SelectImage";

import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { uploadImagesToFirebase } from "@/app/utils/uploadImages";

const AddListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [playListCreated, setPlayListCreated] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const router = useRouter();
  const {
    register,

    reset,
    handleSubmit,
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

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    try {
      if (selectedImages.length === 0) {
        setLoading(false);
        return toast.error(
          "Please upload at least one image for your playlist"
        );
      }

      toast("Your playlist is being created, please wait...");

      const imageUrls = await uploadImagesToFirebase(selectedImages);

      if (imageUrls.length === 0) {
        setLoading(false);
        return toast.error("Something went wrong while uploading images");
      }

      const formData = { ...data, images: imageUrls };
      console.log(formData);

      await axios.post("/api/create", formData);

      toast.success("Playlist created successfully!");
      reset();
      router.refresh();
      setPlayListCreated(true);
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error("Unable to create playlist, please try again later");
    } finally {
      setLoading(false); // Ensure loading is reset even in case of failure
    }
  };

  useEffect(() => {
    if (playListCreated) setSelectedImages([]);
  }, [playListCreated]);

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
      <div className="flex flex-col gap-8 mt-4">
        <div className="font-bold text-xl">
          Insert the Image for the playlist you can have more than one image
        </div>
        <SelectImage
          onImagesSelected={(files: File[]) => {
            setSelectedImages((prev) => {
              if (!prev) return files;
              return [...prev, ...files];
            });
          }}
          selectedImages={selectedImages}
          onImageCancel={(name: string) => {
            setSelectedImages((prev) => {
              return prev.filter((img) => img.name !== name); // Correct filtering
            });
          }}
        />

        <Button
          disabled={isLoading}
          outline
          label={isLoading ? `Creating a list` : `Create a list`}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
};

export default AddListForm;
