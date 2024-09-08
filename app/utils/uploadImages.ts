// uploadImages.ts
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImagesToFirebase = async (
  images: File[]
): Promise<string[]> => {
  const imageUrls: string[] = [];

  for (const image of images) {
    const fileName = new Date().getTime() + "-" + image.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              imageUrls.push(downloadURL);
              console.log("File available at", downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  return imageUrls;
};
