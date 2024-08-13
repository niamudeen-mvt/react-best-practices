import React, { useState, useEffect } from "react";
import api from "../utils/axios";

const Test = () => {
  const [images, setImages] = useState([]);
  const [imgList, setImgList] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      for (const key of Object.keys(images)) {
        formData.append("image", images[key]);
      }
      let res = await api.post("/upload", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {}
  };
  const getImages = async () => {
    try {
      let res = await api.get("/images");
      console.log(res);
      if (res.status === 200) {
        setImgList(res.data.images[0].images);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      <br />

      {imgList?.length
        ? imgList.map((file) => {
            return (
              <img
                key={file._id}
                src={file.image}
                alt="test"
                style={{
                  height: "200px",
                  width: "200px",
                }}
              />
            );
          })
        : null}
    </div>
  );
};

export default Test;
