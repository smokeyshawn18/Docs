import { useEffect, useRef, useState } from "react";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);

  const defaultCard = {
    filename: "profile-pic.png",
    filesize: "N/A",
    timestamp: "N/A",
    desc: "This is a default card with a profile picture.",
    close: true, // Allow the default card to be closed
    tag: {
      isOpen: true,
      tagTitle: "Profile Picture",
      tagColor: "gray",
    },
    imagePath: "C:\\Users\\shuda\\Downloads\\profile-pic.png", // Path to the image
  };

  const [file, setFile] = useState(defaultCard);

  useEffect(() => {
    const savedFile = JSON.parse(localStorage.getItem("file"));
    if (savedFile) {
      setFile(savedFile);
    }
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        filename: uploadedFile.name,
        filesize: `${(uploadedFile.size / 1024 / 1024).toFixed(2)}mb`,
        timestamp: new Date().toLocaleString(),
        desc: "Uploaded file",
        close: true,
        tag: {
          isOpen: true,
          tagTitle: "Successfully Uploaded",
          tagColor: "blue",
        },
        imagePath: URL.createObjectURL(uploadedFile), // Create an object URL for the uploaded file
      };

      localStorage.setItem("file", JSON.stringify(newFile));
      setFile(newFile); // Replace the existing file with the new one
    }
  };

  const handleClose = () => {
    localStorage.removeItem("file");
    setFile(null); // Remove the file when the close button is clicked
  };

  const handleDownload = (filename) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(
        "Simulated file content"
      )}`
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div
      ref={ref}
      className="fixed z-[3] top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5"
    >
      <label
        htmlFor="file-upload"
        className="block w-25 h-10 mx-auto text-lg text-center text-white font-bold rounded-lg cursor-pointer 
             bg-gradient-to-r from-blue-800 via-zinc-700 to-black 
             py-1 px-2 transition-all duration-300 transform hover:scale-105 
             shadow-lg hover:shadow-2xl mb-5 ml-4"
      >
        Choose File
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {file && (
        <Card
          data={file}
          reference={ref}
          onClose={handleClose}
          onDownload={() => handleDownload(file.filename)}
        />
      )}
    </div>
  );
}

export default Foreground;
