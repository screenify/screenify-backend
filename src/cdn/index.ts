import GoogleUploader from "./google-uploader";

/**
 * Uploading function returns the url of the uploaded picture.
 * @param {blob} serializeBlob
 * @param {string} cdnType
 */
export const uploadToGoogleStorage = async (serializeBlob: any) => {
  const bytes = new Uint8Array(serializeBlob.split(","));
  // @ts-ignore
  return await GoogleUploader.upload(Buffer.from(bytes));

  //     .then((url: string) => {

  //       resolve(url);
  //     })
  //     .catch((e: Error) => {
  //       reject(e);
  //     });
  // });
};
