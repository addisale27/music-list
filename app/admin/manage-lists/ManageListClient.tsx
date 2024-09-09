"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import NullData from "@/app/components/NullData";
import { PlayList } from "@prisma/client";
import { useRouter } from "next/navigation";
import ActionBtn from "./ActinBtn";
import { MdDelete, MdRefresh, MdRemoveRedEye } from "react-icons/md";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import { truncateText } from "@/app/utils/trancateText";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/utils/firebaseConfig";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface ManageListClientProps {
  playList: PlayList[];
}

const ManageListClient: React.FC<ManageListClientProps> = ({ playList }) => {
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
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  let rows: any = [];
  if (playList) {
    rows = playList.map((list) => {
      return {
        id: list.id,
        title: truncateText(list.title),
        album: truncateText(list.album),
        genre: truncateText(list.genre),
        releasedYear: list.releasedYear,
        images: list.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 180 },
    { field: "album", headerName: "Album", width: 180 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "releasedYear", headerName: "ReleasedYear", width: 80 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full my-2">
            <ActionBtn
              icon={MdRefresh}
              onClick={() => {
                router.push(`/updateList/${params.row.id}`);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDeleteList(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/list/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 9 };

  if (playList.length === 0)
    return (
      <div className="flex flex-col items-center">
        <NullData title="You haven't created any playlist yet" />
        <Button
          small
          custom="max-w-[150px] p-2"
          label="Create a playlist"
          onClick={() => {
            router.push("/admin/add-list");
          }}
        />
      </div>
    );

  return (
    <div className="relative max-w-full m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Your Own Playlists" center />
      </div>
      <div className="border-2" style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ManageListClient;
