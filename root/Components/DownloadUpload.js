import * as DocumentPicker from "expo-document-picker";
export const upload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.cancelled) {
      throw new Error("File not selected");
    }
    setFile(result);
    const formData = new FormData();
    formData.append("file", {
      uri: result.uri,
      name: result.name,
      type: result.type,
    });
    if (result.type !== "success") {
      return;
    }

    return formData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
