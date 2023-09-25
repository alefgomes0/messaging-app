import { useState } from "react";
import axios from "axios";


export const AddPhoto = () => {
  const [image, setImage] = useState("");
  const userId = "6508695537fe843f89aa8444";

  const postProfilePicture = async (newImage: string) => {
    try {
      await axios.post(
        `http://localhost:3000/upload/${userId}`,
        {
          newImage,
        }
      );
      console.log("uploaded");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const base64 = await convertToBase64(e.target.files[0]);
    setImage(base64 as string);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postProfilePicture(image);
  };

  return (
    <form className="mt-2 flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-neutral-200" htmlFor="file">
          Change your photo
        </label>
        <input
          type="file"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .jpg, .png"
          onChange={(e) => handleFileUpload(e)}
          className="placeholder:text-neutral-200 file:cursor-pointer mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-200 file:text-fuchsia-700 hover:file:bg-neutral-400"
        />
      </div>
      <button
        type="submit"
        className="w-max h-min px-8 py-[3px] rounded-full bg-blue-500 text-blue-50 shadow-[0_2px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.2)_inset]"
      >
        Add Photo
      </button>
    </form>
  );
};

function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
