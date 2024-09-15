import { Client, Storage, ID } from "appwrite";
import envVariables from "../constants/envVariables.js";

class StorageServices {
  client;
  bucket;

  constructor() {
    this.client = new Client()
      .setEndpoint(envVariables.appwriteURL)
      .setProject(envVariables.appwriteProjectId);

    this.bucket = new Storage(this.client);
  }

  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        envVariables.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: StorageServices :: uploadImage :: ${error}`
      );
      return null;
    }
  }

  async getImage(fileId) {
    try {
      return await this.bucket.getFile(envVariables.appwriteBucketId, fileId);
    } catch (error) {
      console.log(
        `Error :: Appwrite :: StorageServices :: getImage :: ${error}`
      );
      return null;
    }
  }

  // this may be done without async function
  async getImagePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(
        envVariables.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: StorageServices :: getImagePreview :: ${error}`
      );
      return null;
    }
  }

  async deleteImage(fileId) {
    try {
      return await this.bucket.deleteFile(
        envVariables.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: StorageServices :: deleteImage :: ${error}`
      );
      return null;
    }
  }
}

const storageServices = new StorageServices();

export default storageServices;
