import { useState } from "react";
import axios from "axios";

export const AddPhoto = () => {
  const [image, setImage] = useState("");

  const postProfilePicture = async (newImage: string) => {
    console.log(newImage);
    try {
      await axios.post(
        "http://localhost:3000/upload/6509fcc98d5435f296b087b6",
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
    console.log(image);
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <input
        type="file"
        name="myFile"
        id="file-upload"
        accept=".jpeg, .jpg, .png"
        onChange={(e) => handleFileUpload(e)}
      />
      <button
        type="submit"
        className="w-max h-min px-8 py-[3px] rounded-full bg-blue-500 text-blue-50"
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
