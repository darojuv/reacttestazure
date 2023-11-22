import { Button, Dropdown, Form, Grid, GridColumn, Header, Input, Label } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import styles from "../FirstForm/FirstForm.module.css";
import { State } from "../../models/State";
import { City } from "../../models/City";
import { County } from "../../models/County";
import { stat } from "fs";

export interface FirstFromProps {
    onStateSelected: (value: number) => void,
    onCitySelected: (value: number) => void,
    onCountySelected: (value: number) => void,
    onFirstFormSubmitted: (value: boolean) => void;
}

const stateDropdownOptions: Array<any> = [];
const cityDropdownOptions: Array<any> = [];
const countyDropdownOptions: Array<any> = [];

export const FirstForm = (props: FirstFromProps) => {

    const [selectedStateId, setSelectedStateId] = useState<string>('');
    const [selectedCityId, setSelectedCityId] = useState<string>('');
    const [selectedCountyId, setSelectedCountyId] = useState<string>('');
    const [isStateDropDownTouched, setIsStateDropDownTouched] = useState<boolean>(false);
    const [isCityDropDownTouched, setIsCityDropDownTouched] = useState<boolean>(false);
    const [isCountyDropDownTouched, setIsCountyDropDownTouched] = useState<boolean>(false);
    const [isFormSubmitted, setFirstFormSubmitted] = useState<boolean>(false);

    useEffect(() => {
        var apiBaseUrl = "https://localhost:7021";
        var getAllStatesApiUrl = `${apiBaseUrl}/area/states/all`;
        var getAllCitiesApiUrl = `${apiBaseUrl}/area/cities/all`;
        var getAllCountiesApiUrl = `${apiBaseUrl}/area/counties/all`;

        const getAllStates = async () => {
            var response = await fetch(getAllStatesApiUrl);
            var states = await response.json() as State[];
            stateDropdownOptions.splice(0, stateDropdownOptions.length); // clear the array to avoid duplicate data
            states.forEach(state => {
                stateDropdownOptions.push(
                    {
                        key: state.id.toString(),
                        value: state.id.toString(),
                        text: state.name
                    });
            });
        };

        const getAllCities = async () => {
            var response = await fetch(getAllCitiesApiUrl);
            var cities = await response.json() as City[];
            cityDropdownOptions.splice(0, cityDropdownOptions.length); // clear the array to avoid duplicate data
            cities.forEach(city => {
                cityDropdownOptions.push(
                    {
                        key: city.id.toString(),
                        value: city.id.toString(),
                        text: city.name
                    });
            });
        };

        const getAllCounties = async () => {
            var response = await fetch(getAllCountiesApiUrl);
            var counties = await response.json() as County[];
            countyDropdownOptions.splice(0, countyDropdownOptions.length); // clear the array to avoid duplicate data
            counties.forEach(county => {
                countyDropdownOptions.push(
                    {
                        key: county.id.toString(),
                        value: county.id.toString(),
                        text: county.name
                    });
            });
        };

        getAllStates();
        getAllCities();
        getAllCounties();

    }, []);


    const onFormSubmit = () => {
        setFirstFormSubmitted(true);
        if (selectedStateId.length > 0 && selectedCityId.length > 0 && selectedCountyId.length > 0) {
            props.onFirstFormSubmitted(true);
        }
    }

    const onStateDropDownValueChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: string) => {
        console.log("state dropdown value changed : " + value);
        console.log(event);
        var selectedStateId = stateDropdownOptions.filter(x => x.value === value)[0]?.value ?? "";
        setSelectedStateId(selectedStateId);
        setIsStateDropDownTouched(true);
        props.onStateSelected(selectedStateId);
        setFirstFormSubmitted(false);
        props.onFirstFormSubmitted(false);
    }

    const onCityDropDownValueChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: string) => {
        console.log("city dropdown value changed : " + value);
        console.log(event);
        var selectedCityId = cityDropdownOptions.filter(x => x.value === value)[0]?.value ?? "";
        setSelectedCityId(selectedCityId);
        setIsCityDropDownTouched(true);
        props.onCitySelected(selectedCityId);
        setFirstFormSubmitted(false);
        props.onFirstFormSubmitted(false);
    }

    const onCountyDropDownValueChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: string) => {
        console.log("county dropdown value changed : " + value);
        console.log(event);
        var selectedCountyId = countyDropdownOptions.filter(x => x.value === value)[0]?.value ?? "";
        setSelectedCountyId(selectedCountyId);
        setIsCountyDropDownTouched(true);
        props.onCountySelected(selectedCountyId);
        setFirstFormSubmitted(false);
        props.onFirstFormSubmitted(false);
    }

    return (
        <>
            <Header>Select Area</Header>
            <br />
            <Form onSubmit={() => onFormSubmit()}>
                <Grid>
                    <div key="state">
                        <Dropdown
                            options={stateDropdownOptions}
                            placeholder="State"
                            selection
                            name="state"
                            onChange={(e, { value }) => onStateDropDownValueChange(e, value as string)} />
                        {(isFormSubmitted || isStateDropDownTouched) && selectedStateId.length == 0 && <span className={styles.errorMessageSpan}>Required!</span>}
                    </div>
                    <div key="city">
                        <Dropdown
                            options={cityDropdownOptions}
                            placeholder="City"
                            selection
                            name="city"
                            onChange={(e, { value }) => onCityDropDownValueChange(e, value as string)} />
                        {(isFormSubmitted || isCityDropDownTouched) && selectedCityId.length == 0 && <span className={styles.errorMessageSpan}>Required!</span>}
                    </div>
                    <div key="county">
                        <Dropdown
                            options={countyDropdownOptions}
                            placeholder="County"
                            selection
                            name="county"
                            onChange={(e, { value }) => onCountyDropDownValueChange(e, value as string)} />
                        {(isFormSubmitted || isCountyDropDownTouched) && selectedCountyId.length == 0 && <span className={styles.errorMessageSpan}>Required!</span>}
                    </div>
                    <div>
                        <Button type="submit" color="blue">Submit</Button>
                    </div>
                </Grid>
            </Form>
        </>
    );

}