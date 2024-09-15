import { Account, Client, ID } from "appwrite";
import envVariables from "../constants/envVariables.js";

class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(envVariables.appwriteURL)
      .setProject(envVariables.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);

      if (!user) throw new Error("Something went wrong while creating user!");

      await this.login(email, password);
      return user;
    } catch (error) {
      console.log(`Error :: Appwrite :: AuthService :: createAccount :: ${error}`);
      return false;
    }
  }

  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );

      if (!session)
        throw new Error("Something went wrong while logging-in user!");

      return session;
    } catch (error) {
      console.log(`Error :: Appwrite :: AuthService :: login :: ${error}`);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log(`Error :: Appwrite :: AuthService :: logout :: ${error}`);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(`Error :: Appwrite :: AuthService :: getCurrentUser :: ${error}`);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
