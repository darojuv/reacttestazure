import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../../auth/AuthConfig";
import { SignOutButton } from "../SignOutButton/SignOutButton";
import { Button, Container, Form, Grid, Header, Input, Label, Segment } from "semantic-ui-react";
import { FirstForm } from "../FirstForm/FirstForm";
import { SecondFormRowModel } from "../../models/SecondFormRowModel";
import { SecondForm } from "../SecondForm/SecondForm";
import styles from "../Home/Home.module.css";

export const Home = () => {

    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState<string>("");

    const [stateId, setStateId] = useState<number>(0);
    const [cityId, setCityId] = useState<number>(0);
    const [countyId, setCountyId] = useState<number>(0);
    const [firstFormSubmitted, setFirstFormSubmitted] = useState<boolean>(false);

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
    }, []);

    const onSecondFormSubmitted = (serviceRates: Array<SecondFormRowModel>) => {
        var requestBody = {
            stateId: stateId,
            cityId: cityId,
            countyId: countyId,
            serviceRates: serviceRates.map((serviceRate) => {
                return {
                    serviceRateOne: serviceRate.firstServiceRate,
                    serviceRateOnePercentage: serviceRate.firstServiceRatePercentage,
                    serviceRateTwo: serviceRate.secondServiceRate,
                    serviceRateTwoPercentage: serviceRate.secondServiceRatePercentage
                }
            })
        };
        console.log("Add service rate request body : ");
        console.log(requestBody);
        var apiBaseUrl = "https://localhost:7021";
        var addServiceRatesToAreaUrl = `${apiBaseUrl}/api/servicerate`;
        fetch(addServiceRatesToAreaUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            console.log("Add service rate to area response : ");
            console.log(response);
        })
    }

    return (
        <Container className={styles.containerDiv}>
            <Segment className={styles.segmentDiv}>
                <FirstForm
                    onStateSelected={(value: number) => setStateId(value)}
                    onCitySelected={(value: number) => setCityId(value)}
                    onCountySelected={(value: number) => setCountyId(value)}
                    onFirstFormSubmitted={(value: boolean) => setFirstFormSubmitted(value)}
                ></FirstForm>
                <br />
                <br />
                <br />
                {firstFormSubmitted &&
                    <SecondForm
                        stateId={stateId}
                        cityId={cityId}
                        countyId={countyId}
                        onSecondFormSubmitted={(formState: Array<SecondFormRowModel>) => onSecondFormSubmitted(formState)}></SecondForm>}
            </Segment>
        </Container>
    );
}