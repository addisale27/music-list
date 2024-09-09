"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import SelectImage from "@/app/components/Inputs/SelectImage";
import TextArea from "@/app/components/Inputs/TextArea";
import { uploadImagesToFirebase } from "@/app/utils/uploadImages";
import { PlayList, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface UpdataFormProps {
  playList: PlayList & {
    user: User;
  };
}
const UpdateForm: React.FC<UpdataFormProps> = ({ playList }) => {
  const [isLoading, setLoading] = useState(false);
  const [playListUpdated, setPlayListUpdated] = useState(false);
  const [playListImages, setPlayListImages] = useState<string[]>(
    playList.images
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const router = useRouter();
  const {
    register,

    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: playList.title,
      artist: playList.artist,
      album: playList.album,
      genre: playList.genre,
      releasedYear: playList.releasedYear,
      description: playList.description,
      images: playList.images,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    try {
      toast("Your playlist is being updated, please wait...");

      const imageUrls =
        selectedImages.length > 0
          ? await uploadImagesToFirebase(selectedImages)
          : playListImages;

      if (imageUrls.length === 0) {
        setLoading(false);
        return toast.error("Something went wrong while uploading images");
      }

      const formData = { ...data, images: imageUrls };
      console.log(formData);

      axios.put(`/api/create/${playList.id}`, formData).then(() => {
        toast.success("Playlist updated successfully!");

        router.refresh();
        setPlayListUpdated(true);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error("Unable to update playlist, please try again later");
    } finally {
      setLoading(false); // Ensure loading is reset even in case of failure
    }
  };

  useEffect(() => {
    if (playListUpdated) setSelectedImages([]);
  }, [playListUpdated]);

  return (
    <>
      <Heading title="Update a playlist" />

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
          Insert Images for the playlist you can have more than one image.
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
          label={isLoading ? `Updating a playlist` : `Updata a playlist`}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
};

export default UpdateForm;
