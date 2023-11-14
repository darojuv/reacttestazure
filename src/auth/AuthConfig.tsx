import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
      clientId: "45c6081b-7779-4319-82a4-06d5ddc48585",
      authority: "https://login.microsoftonline.com/4a402691-f5fe-4125-b95b-34f6db5c9ad1",
      redirectUri: "http://localhost:3000",
      postLogoutRedirectUri: "http://localhost:3000/logout",
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false
    }
  };

  export const loginRequest = {
    scopes: ["api://feb2d36f-e6f3-47f9-b098-62b4669c2c9d/api.scope","user.read"]
  };

  export const graphApiConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  }