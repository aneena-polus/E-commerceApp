import React, { useState } from "react";

function ImageUploader({ onChange, image }) {
    const [selectedImage, setSelectedImage] = useState(image || null);

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedImage(URL.createObjectURL(file));
        } else {
            alert("Please select an image file.");
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleClick = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            handleFileSelect(file);
            onChange(file);
        };
        fileInput.click();
    };

    return (
        <div>
            <div onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}
                onClick={handleClick} style={{
                    border: "2px dashed #ccc", borderRadius: "8px", width: "300px",
                    height: "200px", display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", margin: "20px auto", textAlign: "center"
                }}>
                {selectedImage ? (
                    <img src={selectedImage !== image ? selectedImage : `http://localhost:3000/uploads/${image}`}
                        alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                ) : (
                    <p>Drag and drop an image here, or click to upload</p>
                )}
            </div>
        </div>
    );
}

export default ImageUploader;
