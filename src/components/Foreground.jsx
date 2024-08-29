import { useEffect, useRef, useState } from "react";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);

  const [files, setFiles] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
    setFiles(savedFiles);
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

      const updatedFiles = [...files, newFile];
      localStorage.setItem("files", JSON.stringify(updatedFiles));
      setFiles(updatedFiles); // Update state to include the new file
    }
  };

  const handleClose = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    localStorage.setItem("files", JSON.stringify(updatedFiles));
    setFiles(updatedFiles); // Update state after removing a file
  };

  const handleDownload = (filename) => {
    const file = files.find((file) => file.filename === filename);
    if (file) {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        `data:text/plain;charset=utf-8,${encodeURIComponent(
          "Simulated file content"
        )}`
      );
      element.setAttribute("download", file.filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
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

      {files.map((file, index) => (
        <Card
          key={index}
          data={file}
          reference={ref}
          onClose={() => handleClose(index)}
          onDownload={() => handleDownload(file.filename)}
        />
      ))}
    </div>
  );
}

export default Foreground;
