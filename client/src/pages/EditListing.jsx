import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ListingFormBody from "../components/ListingFormBody";

const EditListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUpload, setImageUpload] = useState(0);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let totalImages = 0;
  let uploadedImages = 0;
  const params = useParams();
  const disabled =
    formData.name === "" ||
    formData.address === "" ||
    formData.description === "";
  // console.log(formData);

  // console.log(files);
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      //   console.log(listingId);
      const res = await fetch(
        `https://real-estate-0kkf.onrender.com/api/listing/get/${listingId}`
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
          toast({
            title: "Image upload failed (2 mb max per image)",
            position: "bottom-left",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
      toast({
        title: "You can only upload 6 images per listing",
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Increment totalImages when starting to upload a new image
      totalImages++;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          uploadedImages++;
          const progressPercentage = (uploadedImages / totalImages) * 100;
          setImageUpload(progressPercentage);
          if (uploadedImages === totalImages) {
            setImageUpload(100);
          }
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]:
          e.target.type === "number" ? +e.target.value : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        toast({
          title: "You must upload at least one image",
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return setError("You must upload at least one image");
      }

      if (formData.regularPrice < formData.discountPrice) {
        toast({
          title: "Discount price must be lower than regular price",
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return setError("Discount price must be lower than regular price");
      }

      setLoading(true);
      setError(false);
      const res = await fetch(
        `https://real-estate-0kkf.onrender.com/api/listing/update/${params.listingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        toast({
          title: `${data.message}`,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Listing Edited Successfully!",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast({
        title: `${data.message}`,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <ListingFormBody
      handleImageSubmit={handleImageSubmit}
      handleChange={handleChange}
      storeImage={storeImage}
      handleRemoveImage={handleRemoveImage}
      handleSubmit={handleSubmit}
      formData={formData}
      disabled={disabled}
      loading={loading}
      uploading={uploading}
      setFiles={setFiles}
      files={files}
      imageUpload={imageUpload}
      setImageUpload={setImageUpload}
      name="Edit"
    />
  );
};

export default EditListing;
