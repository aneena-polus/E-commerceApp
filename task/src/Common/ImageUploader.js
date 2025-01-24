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
            <div onDragOver={(event) => event.preventDefault()}
                onClick={handleClick} className="image-uploader">
                {selectedImage ? (
                    <img src={selectedImage !== image ? selectedImage : `http://localhost:3000/uploads/${image}`}
                        alt="Preview" className="card-image" />
                ) : (
                    <p>Click to upload an image.</p>
                )}
            </div>
        </div>
    );
}

export default ImageUploader;
