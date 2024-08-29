import { useEffect, useRef, useState } from "react";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);

  const defaultCard = {
    filename: "default-file.txt",
    filesize: "0mb",
    timestamp: "N/A",
    desc: "This is a default card",
    close: false, // Set to false if you don't want the default card to be closed
    tag: {
      isOpen: true,
      tagTitle: "Default File",
      tagColor: "gray",
    },
  };

  const [files, setFiles] = useState([defaultCard]);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
    if (savedFiles.length > 0) {
      setFiles(savedFiles);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        filename: file.name,
        filesize: `${(file.size / 1024 / 1024).toFixed(2)}mb`,
        timestamp: new Date().toLocaleString(),
        desc: "Uploaded file",
        close: true,
        tag: {
          isOpen: true,
          tagTitle: "Successfully Uploaded",
          tagColor: "blue",
        },
      };

      const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
      savedFiles.push(newFile);
      localStorage.setItem("files", JSON.stringify(savedFiles));

      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleClose = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    if (updatedFiles.length === 0) {
      updatedFiles.push(defaultCard); // Add the default card back if all files are closed
    }
    setFiles(updatedFiles);
    localStorage.setItem("files", JSON.stringify(updatedFiles));
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
        className="block w-full text-xl text-zinc-300 font-bold  cursor-pointer
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100
                   mb-5"
      >
        Choose File
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
      {files.map((item, index) => (
        <Card
          key={index}
          data={item}
          reference={ref}
          onClose={() => handleClose(index)}
          onDownload={() => handleDownload(item.filename)}
        />
      ))}
    </div>
  );
}

export default Foreground;
