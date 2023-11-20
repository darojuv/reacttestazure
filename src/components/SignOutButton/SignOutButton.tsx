import React from "react";
import { useMsal } from "@azure/msal-react";
import { EndSessionRequest, IPublicClientApplication } from "@azure/msal-browser";
import { Button, Container, Segment } from "semantic-ui-react";

function handleRedirectLogout(instance : IPublicClientApplication) {
    const account = instance.getActiveAccount();
    var logoutRequest : EndSessionRequest = {
        account: account,
        postLogoutRedirectUri: "http://localhost:3000/logout"
    };
    instance.logout(logoutRequest);
    // instance.logoutRedirect().catch(e => {
    //     console.error(e);
    // });    
}

export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <Container>
            <Segment textAlign="center" vertical={true}>
                <Button color="red" onClick={() => handleRedirectLogout(instance)}>Sign Out Using Azure AD</Button>
            </Segment>
        </Container>
    );
}