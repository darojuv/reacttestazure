import { Button, Dropdown, Form, Grid, GridColumn, Header, Input, Label } from "semantic-ui-react";
import React, { useState } from "react";
import styles from "../FirstForm/FirstForm.module.css";

export interface FirstFromProps {
    onFirstDropDownValueSelected: (value: string) => void,
    onSecondDropDownValueSelected: (value: string) => void,
    onThirdDropDownValueSelected: (value: string) => void,
    onFirstFormSubmitted: () => void;
}

const stateDropdownOptions = [
    { key: '', text: 'NA', value: '' },
    { key: 'AL', text: 'Alabama', value: 'AL' },
    { key: 'AK', text: 'Alaska', value: 'AK' },
    { key: 'CA', text: 'California', value: 'CA' },
];

const cityDropdownOptions = [
    { key: '', text: 'NA', value: '' },
    { key: 'NYC', text: 'New York', value: 'NYC' },
    { key: 'LA', text: 'Los Angeles', value: 'LA' },
    { key: 'CH', text: 'Chicago', value: 'CH' },
    { key: 'LV', text: 'Las Vegas', value: 'LV' },
];

const countyDropdownOptions = [
    { key: '', text: 'NA', value: '' },
    { key: 'AU', text: 'Autauga', value: 'AU' },
    { key: 'BW', text: 'Baldwin', value: 'BW' },
    { key: 'CL', text: 'Clarke', value: 'CL' }
];

export const FirstForm = (props: FirstFromProps) => {

    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedCounty, setSelectedCounty] = useState<string>('');
    const [isStateDropDownTouched, setIsStateDropDownTouched] = useState<boolean>(false);
    const [isCityDropDownTouched, setIsCityDropDownTouched] = useState<boolean>(false);
    const [isCountyDropDownTouched, setIsCountyDropDownTouched] = useState<boolean>(false);
    const [isFormSubmit, setFirstFormSubmit] = useState<boolean>(false);

    const onFormSubmit = () => {
        setFirstFormSubmit(true);
        if(selectedState.length > 0 && selectedCity.length > 0 && selectedCounty.length > 0) {
            props.onFirstFormSubmitted();
        }
    }

    const onStateDropDownValueChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: string) => {
        console.log("state dropdown value changed : " + value);
        console.log(event);
        var selectedStateId = stateDropdownOptions.filter(x => x.value === value)[0]?.value ?? "";
        setSelectedState(selectedStateId);
        setIsStateDropDownTouched(true);
        props.onFirstDropDownValueSelected(selectedStateId);
    }

    const onCityDropDownValueChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: string) => {
        console.log("city dropdown value changed : " + value);
        console.log(event);
        var selectedCityId = cityDropdownOptions.filter(x => x.value === value)[0]?.value ?? "";
        setSelectedCity(selectedCityId);
        setIsCityDropDownTouched(true);
        props.onSecondDropDownValueSelected(selectedCityId);
    }

    const onCountyDropDownValueChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: string) => {
        console.log("county dropdown value changed : " + value);
        console.log(event);
        var selectedCountyId = countyDropdownOptions.filter(x => x.value === value)[0]?.value ?? "";
        setSelectedCounty(selectedCountyId);
        setIsCountyDropDownTouched(true);
        props.onThirdDropDownValueSelected(selectedCountyId);
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
                        {(isFormSubmit || isStateDropDownTouched ) && selectedState.length == 0 && <span className={styles.errorMessageSpan}>Required!</span>}
                    </div>
                    <div key="city">
                        <Dropdown
                            options={cityDropdownOptions}
                            placeholder="City"
                            selection
                            name="city"
                            onChange={(e, { value }) => onCityDropDownValueChange(e, value as string)} />
                        {(isFormSubmit || isCityDropDownTouched ) && selectedCity.length == 0 && <span className={styles.errorMessageSpan}>Required!</span>}
                    </div>
                    <div key="county">
                        <Dropdown
                            options={countyDropdownOptions}
                            placeholder="County"
                            selection
                            name="county"
                            onChange={(e, { value }) => onCountyDropDownValueChange(e, value as string)} />
                        {(isFormSubmit || isCountyDropDownTouched ) && selectedCounty.length == 0 && <span className={styles.errorMessageSpan}>Required!</span>}
                    </div>
                    <div>
                        <Button type="submit" color="blue">Submit</Button>
                    </div>
                </Grid>
            </Form>
        </>
    );

}