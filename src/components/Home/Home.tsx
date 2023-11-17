import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../../auth/AuthConfig";
import { SignOutButton } from "../SignOutButton/SignOutButton";
import { Button, Form, Grid, Header, Input, Label } from "semantic-ui-react";
import { FirstForm } from "../FirstForm/FirstForm";
import { SecondFormRowModel } from "../../models/SecondFormRowModel";
import { SecondForm } from "../SecondForm/SecondForm";

export const Home = () => {
    
    const {instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState<string>("");

    const [firstDropDownValue, setFirstDropDownValue] = useState<string>("");
    const [secondDropDownValue, setSecondDropDownValue] = useState<string>("");
    const [thirdDropDownValue, setThirdDropDownValue] = useState<string>("");
    const [firstFormSubmitted, setFirstFormSubmitted] = useState<boolean>(false);
    const [secondFormState, setSecondFormState] = useState<Array<SecondFormRowModel>>();



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
            <Header textAlign="center">Dashboard</Header>
            <FirstForm
                onFirstDropDownValueSelected={(value: string) => setFirstDropDownValue(value)}
                onSecondDropDownValueSelected={(value: string) => setSecondDropDownValue(value)}
                onThirdDropDownValueSelected={(value: string) => setThirdDropDownValue(value)}
                onFirstFormSubmitted={() => setFirstFormSubmitted(true)}
            ></FirstForm>
            <br />
            <br />
            <br />
            <br />
            <br />
            {firstFormSubmitted && <SecondForm onSecondFormSubmitted={(formState: Array<SecondFormRowModel>) => setSecondFormState(formState)}></SecondForm>}
        </div>
    );
}