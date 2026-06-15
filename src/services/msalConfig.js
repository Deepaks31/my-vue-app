import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "12dccfb2-944f-4d6d-85d2-4d1acc041b23",
        authority: "https://login.microsoftonline.com/1e499b00-b34d-4461-b219-a45d602ca97c",
        redirectUri: window.location.origin, // Automatically uses localhost or the Azure URL
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
    scopes: ["User.Read"]
};
