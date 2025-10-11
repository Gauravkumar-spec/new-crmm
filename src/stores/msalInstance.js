import { PublicClientApplication } from "@azure/msal-browser";
import config from "./config";

export const msalInstance = new PublicClientApplication(config.msalConfig);
