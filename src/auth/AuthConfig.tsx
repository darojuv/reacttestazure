import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
      clientId: "3bd94eb2-7194-43ba-9b98-77e332991347",
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
  scopes: ["api://ad663b57-7fd3-420d-99b2-5dc839332f2e/api.scope", "user.read"]
};

export const graphApiConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}