import { IPublicClientApplication } from "@azure/msal-browser";
import { SignInButton } from "../SignInButton/SignInButton";

export const Logout = () => {
    return(
        <div>
            You have been logged out successfully!
            <SignInButton />
        </div>
    );
}