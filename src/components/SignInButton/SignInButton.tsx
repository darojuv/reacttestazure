import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth/AuthConfig";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleRedirectLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export const SignInButton = () => {
    
    const { instance } = useMsal();

    return (
        <div className="actions stacked">
            <button onClick={() => handleRedirectLogin(instance)} className="button small icon solid fa-user">Sign In Using Azure AD</button>
        </div>
    );
}