import axios from "../../../http/axiosSet";
import React, { useContext, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
export const imageUpload = async (file) => {
  const uploadResult = await FileSystem.uploadAsync(
    "https://stepdev.up.railway.app/media/uploadfile",
    file,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "file",
    }
  );
  return uploadResult;
};

export const fileUpload = async (doc) => {
  const uploadResult = await FileSystem.uploadAsync(
    "https://stepdev.up.railway.app/media/uploadfile",
    doc,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "file",
    }
  );
  return uploadResult;
};
