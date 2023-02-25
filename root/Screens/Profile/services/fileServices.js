import axios from "../../../http/axiosSet";
import React, { useContext, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as IntentLauncher from "expo-intent-launcher";
import { ToastAndroid } from "react-native";
export const imageUpload = async (file) => {
  const uploadResult = await FileSystem.uploadAsync(
    "https://stepev-dev.up.railway.app/media/uploadfile",
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
    "https://stepev-dev.up.railway.app/media/uploadfile",
    doc,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "file",
    }
  );
  return uploadResult;
};

export const downloadFile = async (uri) => {
  const targetUri =
    FileSystem.documentDirectory +
    uri.substring(uri.lastIndexOf("/") + 1, uri.length);
  console.log(targetUri);
  if (uri.substring(uri.lastIndexOf("/") + 1, uri.length == "")) {
    ToastAndroid.show("No file to download", ToastAndroid.SHORT);
  }

  const downloadedFile = await FileSystem.downloadAsync(uri, targetUri);

  if (downloadedFile.status === 200) {
    if (Platform.OS === "android") {
      const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (permission.status !== "granted") {
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      console.log("donloaded");

      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      const cUri = await FileSystem.getContentUriAsync(targetUri);

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "application/pdf",
      });
    }
  }
};
export const fileGet = async (accessToken, doc) => {
  console.log(doc);
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.get(
      `/media/getFile/${doc}`,

      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
