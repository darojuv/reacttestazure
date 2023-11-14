import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth/AuthConfig";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button } from "semantic-ui-react";

function handleRedirectLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export const SignInButton = () => {
    
    const { instance } = useMsal();

    return (
        <div className="actions stacked">
            <Button color="blue" onClick={() => handleRedirectLogin(instance)}>Sign In Using Azure AD</Button>
        </div>
    );
}