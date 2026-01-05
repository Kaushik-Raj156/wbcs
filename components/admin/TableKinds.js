import React, { useState, useRef } from "react";
import Image from "next/image";

export default function TableKinds({
  i,
  register,
  errors,
  storeSt,
  setStoreSt,
}) {
  const [color, setColor] = useState(storeSt[i].color);
  const [clrCode, setClrCode] = useState(storeSt[i].colorCode);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file upload
  const uploadFile = async (file) => {
    if (!file) return;

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      alert(`File size exceeds maximum limit of 50MB. Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, GIF, etc.)');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');
      
      const response = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Upload failed');
      }

      console.log('Upload successful:', data.url);

      const newUrls = [...(storeSt[i].imgUrls || []), data.url];
      let tempObj = [...storeSt];
      tempObj[i].imgUrls = newUrls;
      setStoreSt(tempObj);
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        uploadFile(file);
      }
    });
  };

  // Handle file input change
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        uploadFile(file);
      }
    });
  };

  // Remove image
  const removeImage = (index) => {
    const newUrls = storeSt[i].imgUrls.filter((_, i) => i !== index);
    let tempObj = [...storeSt];
    tempObj[i].imgUrls = newUrls;
    setStoreSt(tempObj);
  };

  const TR = (val, j) => (
    <tr className="border-b border-hover hover:bg-hover transition-colors">
      <td className="py-3 pr-2">
        <input
          className="w-full bg-secondary text-primary border border-hover rounded-lg py-2 px-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none placeholder-gray-400"
          type="text"
          placeholder="e.g., Red, Blue"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            let tempObj = [...storeSt];
            tempObj[i]["color"] = e.target.value;
            setStoreSt(tempObj);
          }}
        />
      </td>
      <td className="py-3 pr-2">
        <input
          className="w-full bg-secondary text-primary border border-hover rounded-lg py-2 px-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none placeholder-gray-400"
          type="text"
          placeholder="e.g., #FF0000"
          value={clrCode}
          onChange={(e) => {
            setClrCode(e.target.value);
            let tempObj = [...storeSt];
            tempObj[i]["colorCode"] = e.target.value;
            setStoreSt(tempObj);
          }}
        />
      </td>
      <td className="py-3 pr-2">
        <select
          className="w-full text-primary bg-secondary border border-hover rounded-lg py-2 px-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none cursor-pointer"
          name="size"
          onChange={(e) => {
            let tempObj = [...storeSt];
            tempObj[i]["sizeAmnt"][j]["size"] = e.target.value;
            setStoreSt(tempObj);
          }}
        >
          <option value="" selected={"" === val["size"] ? true : false}>
            Select size
          </option>
          <option value="XS" selected={"XS" === val["size"] ? true : false}>
            XS
          </option>
          <option value="S" selected={"S" === val["size"] ? true : false}>
            S
          </option>
          <option value="M" selected={"M" === val["size"] ? true : false}>
            M
          </option>
          <option value="L" selected={"L" === val["size"] ? true : false}>
            L
          </option>
          <option value="XL" selected={"XL" === val["size"] ? true : false}>
            XL
          </option>
          <option value="XXL" selected={"XXL" === val["size"] ? true : false}>
            XXL
          </option>
        </select>
      </td>
      <td className="py-3">
        <input
          className="w-full bg-secondary text-primary border border-hover rounded-lg py-2 px-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none placeholder-gray-400"
          type="number"
          placeholder="Stock qty"
          defaultValue={val["amount"]}
          onChange={(e) => {
            let tempObj = [...storeSt];
            tempObj[i]["sizeAmnt"][j]["amount"] = e.target.value;
            setStoreSt(tempObj);
          }}
        />
      </td>
    </tr>
  );

  return (
    <div className="w-full px-0 mx-auto">
      <table className="mt-6 mb-4 w-full">
        <thead>
          <tr className="text-left border-b-2 border-accent">
            <th className="pb-3 text-primary font-semibold">Color</th>
            <th className="pb-3 text-primary font-semibold">Color Code</th>
            <th className="pb-3 text-primary font-semibold">Size</th>
            <th className="pb-3 text-primary font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {storeSt[i]["sizeAmnt"].map((val, j) => (
            <React.Fragment key={j}>
              {TR(val, j)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="mb-6 flex gap-3">
        <button
          type="button"
          className="px-6 py-2 bg-accent hover:bg-green-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md font-medium flex items-center gap-2"
          onClick={() => {
            let tempObj = [...storeSt];
            tempObj[i]["sizeAmnt"].push({ size: "", amount: 0 });
            setStoreSt(tempObj);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Row
        </button>
        {storeSt[i]["sizeAmnt"].length > 1 && (
          <button
            type="button"
            className="px-6 py-2 bg-danger hover:bg-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md font-medium flex items-center gap-2"
            onClick={() => {
              let tempObj = [...storeSt];
              tempObj[i]["sizeAmnt"].pop();
              setStoreSt(tempObj);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
            </svg>
            Delete Row
          </button>
        )}
      </div>
      <label className="text-base font-semibold text-primary">Product Images</label>
      <p className="text-sm text-secondary mt-1 mb-3">
        Drag and drop images here or click to select files
      </p>

      {/* Drag and Drop Area */}
      <div
        className={`w-full h-48 mt-4 mb-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-accent bg-accent bg-opacity-20 scale-105'
            : 'border-hover hover:border-accent bg-secondary'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
            <p className="text-secondary">Uploading...</p>
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-secondary">
              {isDragOver ? 'Drop images here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* Image Previews */}
      {storeSt[i].imgUrls && storeSt[i].imgUrls.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-secondary mb-2">Uploaded Images:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {storeSt[i].imgUrls.map((url, index) => (
              <div key={index} className="relative group">
                <Image
                  src={url}
                  alt={`Product image ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden input for form validation */}
      <input
        type="hidden"
        value={storeSt[i].imgUrls?.length || 0}
        {...register(`imgUrls${i}`, {
          validate: value => (storeSt[i].imgUrls && storeSt[i].imgUrls.length > 0) || "At least one image is required"
        })}
      />
      {errors[`imgUrls${i}`] && <p className="text-red-700 mb-8">*At least one image is required</p>}
      <hr />
    </div>
  );
}
