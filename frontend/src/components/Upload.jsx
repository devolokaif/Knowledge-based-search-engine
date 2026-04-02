import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [files, setFiles] = useState([]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://knowledge-based-search-engine.onrender.com", formData);
      setFiles((prev) => [...prev, file.name]);
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">

      {/* Upload Button */}
      <label className="cursor-pointer flex items-center justify-center border border-gray-700 rounded-lg py-2 hover:bg-gray-800">
        ➕ Upload File
        <input
          type="file"
          hidden
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </label>

      {/* Uploaded Files */}
      <div className="text-xs text-gray-400 space-y-2">
        {files.map((file, i) => (
          <div key={i} className="truncate bg-gray-800 p-2 rounded">
            📄 {file}
          </div>
        ))}
      </div>
    </div>
  );
}