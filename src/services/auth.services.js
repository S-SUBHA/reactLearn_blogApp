import envVariables from "../constants/envVariables.js";

class AuthService {
  client;
  account;

  constructor() {
    this.client = "";
    this.account = "";
    console.log(envVariables);
  }

  async createAccount() {
    console.log("\nInside createAccount!");
  }

  async login() {
    console.log("\nInside login!");
  }

  async logout() {
    console.log("\nInside logout!");
  }

  async getUserAccount() {
    console.log("\nInside getUserAccount!");
  }
}

const authService = new AuthService();

export default authService;
