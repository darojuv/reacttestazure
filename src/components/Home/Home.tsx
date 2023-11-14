import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../../auth/AuthConfig";
import { SignOutButton } from "../SignOutButton/SignOutButton";

export const Home = () => {
    
    const {instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState<string>("");


    useEffect(() => {
        console.log("calling use effect *****");
        var accessTokenRequest = {
            ...loginRequest,
            account: accounts[0]
        };
        instance.acquireTokenSilent(accessTokenRequest).then((response) => {
            console.log("Access Token Response :");
            console.log(response);
        }).catch((error) => {
            throw error;
        })
    },[]);

    return(
        <div>
            Logged In Successfully
            <SignOutButton />
        </div>
    );
}