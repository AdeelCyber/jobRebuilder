import * as FileSystem from 'expo-file-system'
export const imageUpload = async (accessToken, file) => {
  console.log(file)

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${accessToken}`,
    },
    //   body: JSON.stringify(data),
    //data: JSON.stringify(file),
  }
  const uploadResult = await FileSystem.uploadAsync(
    'https://stepdev.up.railway.app/media/uploadfile',
    file,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
    }
  )
  console.log(uploadResult)
}
