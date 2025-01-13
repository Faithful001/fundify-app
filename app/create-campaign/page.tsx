"use client";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Input from "@/components/ui/inputs";
import { useBlockchain } from "@/contexts/BlockchainContext";
import Image from "next/image";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import Textarea from "@/components/ui/inputs/textarea";
import Button from "@/components/ui/buttons";
import { useMutation } from "@tanstack/react-query";
import { ApiUrl } from "@/utils/apiUrl.util";
import { ApiRequest } from "@/utils/apiRequest.util";
import { Spinner, useToast } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";

const CreateCampaign = () => {
  const toast = useToast();
  const [uploadToBlockchainIsLoading, setUploadToBlockchainIsLoading] =
    useState(false);
  const [uploadToBlockchainError, setUploadToBlockchainError] = useState("");

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    target: string; // Accept input as a string
    deadline: string;
    image: string;
  }>({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { image: _, ...restFormData } = formData;
  const allFieldsArePopulated = Object.values({
    ...restFormData,
    previewUrl,
  }).every((data) => !!data);

  // Handle drag over event to prevent default behavior and show dragging state
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle drag leave event to reset the dragging state
  const handleDragLeave = () => {
    setDragging(false);
  };

  // Handle drop event and extract the dropped file
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile); // Set the dropped file (replaces old file)
      // const filePath: string[] = URL.createObjectURL(droppedFile).split(":");
      // const path = filePath[1];
      setPreviewUrl(URL.createObjectURL(droppedFile)); // Generate preview URL
    }
  };

  // Handle file selection via the input (for replacing existing file)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the dropped file (replaces old file)
      // const filePath: string[] = URL.createObjectURL(selectedFile).split(":");
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const { publishCampaign } = useBlockchain();

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const cloudName = ApiUrl.cloudinaryCloudName;
      const uploadPreset = ApiUrl.cloudinaryUploadPreset;
      const formData = new FormData();
      file && formData.append("file", file);
      cloudName && formData.append("cloud_name", cloudName);
      uploadPreset && formData.append("upload_preset", uploadPreset);
      const response = await ApiRequest.post(
        ApiUrl.uploadToCloudinary,
        formData,
        { "Content-Type": "multipart/form-data" }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      toast({
        description: "Upload successful",
        status: "success",
        position: "top",
      });
      setFormData((prevFormData) => ({ ...prevFormData, image: data.url }));
    },
    onError: (error: any) => {
      console.error("cloudinary upload error:", error);
      toast({
        description: "Error uploading image",
        status: "error",
        position: "top",
      });
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    mutate();
    if (!formData.target) {
      throw new Error("Target value is required");
    }
    const parsedTarget = ethers.utils.parseUnits(formData.target, 18);
    const { isLoading, error, isError, isSuccess } = await publishCampaign({
      ...formData,
      target: parsedTarget,
    });
    if (isError) {
      toast({
        description: "Failed to create campaign",
        status: "error",
        position: "top",
      });
    }
    if (isSuccess) {
      toast({
        description: "Campaign created successfully",
        status: "success",
        position: "top",
      });
    }
    setUploadToBlockchainIsLoading(isLoading);
    setUploadToBlockchainError(error);
  }

  return (
    <DashboardLayout>
      <div className="create-campaign flex flex-col gap-4">
        <h1 className="title rounded-lg text-lg bg-[#1E222D] font-bold w-full p-5 text-center flex ite- justify-center">
          Start a Campaign 📣
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <span className="flex flex-col gap-1">
            <label className="text-sm">Title* </label>
            <Input
              placeholder="Enter title"
              onChange={handleOnChange}
              name="title"
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className="text-sm ">Description*</label>
            <Textarea
              id=""
              placeholder="Enter description"
              onChange={handleOnChange}
              name="description"
              rows={3}
              className="h-24 resize-none"
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className="text-sm ">Goal*</label>
            <Input
              type="number"
              placeholder="ETH 0.50"
              onChange={handleOnChange}
              name="target"
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className="text-sm ">End Date*</label>
            <Input
              placeholder="Select deadline"
              onChange={handleOnChange}
              name="deadline"
              type="date"
            />
          </span>
          <div className="flex flex-col gap-1 items-start justify-between w-full">
            <p className="text-sm">Image*</p>
            <div
              className={`bg-dark-gray rounded-xl flex flex-col items-center w-full gap-2 border ${
                dragging ? "border-primary" : "border-white/70"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label
                className={`${
                  dragging ? "bg-primary" : "bg-transparent"
                } flex justify-center items-center text-white border border-white/30 w-full rounded-lg h-20 cursor-pointer`}
                htmlFor="fileInput" // This must match the ID of the input element
              >
                {file ? (
                  <span>{file.name}</span> // Display the name of the selected/dropped file
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FiUploadCloud />
                    <p>Drag & Drop or Click to Upload</p>
                  </div> // Placeholder text before a file is selected
                )}
              </label>

              <Input
                type="file"
                id="fileInput" // Ensure this matches the `htmlFor` in the label
                className="hidden"
                onChange={handleFileChange}
                accept="image/*" // Optional: accept only image files
              />
            </div>
            {previewUrl && (
              <span className="relative">
                <IoCloseCircleSharp
                  className="absolute -top-2 -right-2 cursor-pointer"
                  size={"22px"}
                  onClick={() => {
                    setPreviewUrl(null);
                    setFile(null);
                  }}
                />
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="mt-2 rounded-md max-w-full h-auto"
                  width={70}
                  height={70}
                />
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isPending || !allFieldsArePopulated || uploadToBlockchainIsLoading
            }
          >
            {isPending ? <Spinner /> : "Publish"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;
