import { Client, Databases, Query } from "appwrite";
import envVariables from "../constants/envVariables";

class DatabaseServices {
  client;
  database;

  constructor() {
    this.client = new Client()
      .setEndpoint(envVariables.appwriteURL)
      .setProject(envVariables.appwriteProjectId);

    this.database = new Databases(this.client);
  }

  async createPost({ slug, title, content, featuredImage, status, userId }) {
    try {
      return this.database.createDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: DatabaseService :: createPost :: ${error}`
      );
      return null;
    }
  }

  async updatePost(
    documentId,
    { title, content, featuredImage, status, userId }
  ) {
    try {
      return this.database.updateDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        documentId,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: DatabaseService :: updatePost :: ${error}`
      );
      return null;
    }
  }

  //   TODO: check for the case that only the owner of the post can delete.
  async deletePost(documentId) {
    try {
      return this.database.deleteDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: DatabaseService :: deletePost :: ${error}`
      );
      return null;
    }
  }

  async getPost(documentId) {
    try {
      return await this.database.getDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: DatabaseService :: getPost :: ${error}`
      );
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.database.listDocuments(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        `Error :: Appwrite :: DatabaseService :: getActivePosts :: ${error}`
      );
      return [];
    }
  }
}

const databaseServices = new DatabaseServices();

export default databaseServices;
