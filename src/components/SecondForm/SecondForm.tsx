import { useEffect, useRef, useState } from "react"
import { SecondFormRowErrorModel, SecondFormRowModel } from "../../models/SecondFormRowModel"
import { Button, Form, Grid, GridColumn, Header, Input, Label } from "semantic-ui-react";
import styles from "../SecondForm/SecondForm.module.css";


export interface SecondFormProps {
    stateId: number,
    cityId: number,
    countyId: number,
    onSecondFormSubmitted: (formState: Array<SecondFormRowModel>) => void
}

export const SecondForm = (props: SecondFormProps) => {

    const initialFormState: SecondFormRowModel = {
        firstServiceRate: 0,
        firstServiceRatePercentage: 0,
        secondServiceRate: 0,
        secondServiceRatePercentage: 0
    }

    const initialErrorState: SecondFormRowErrorModel = {
        isFirstServiceRateError: false,
        isFirstServiceRateTouched: false,
        isFirstServiceRatePercentageError: false,
        isFirstServiceRatePercentageTouched: false,
        isSecondServiceRateError: false,
        isSecondServiceRateTouched: false,
        isSecondServiceRatePercentageError: false,
        isSecondServiceRatePercentageTouched: false
    }

    const [formState, setFormState] = useState<Array<SecondFormRowModel>>([]);
    const [formErrorState, setFormErrorState] = useState<Array<SecondFormRowErrorModel>>([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const getServiceRatesForArea = async () => {
            var apiBaseUrl = "https://localhost:7021";
            var getServiceRatesApiUrl: string = `${apiBaseUrl}/api/ServiceRate?StateId=${props.stateId}&CityId=${props.cityId}&CountyId=${props.countyId}`;
            var response = await fetch(getServiceRatesApiUrl);
            var serviceRates = await response.json() as Array<any>;
            var formStateArray: Array<SecondFormRowModel> = [];
            serviceRates.forEach(serviceRate => {
                var formStateEntry: SecondFormRowModel = {
                    firstServiceRate: serviceRate.serviceRateOne,
                    firstServiceRatePercentage: serviceRate.serviceRateOnePercentage,
                    secondServiceRate: serviceRate.serviceRateTwo,
                    secondServiceRatePercentage: serviceRate.serviceRateTwoPercentage
                };
                formStateArray.push(formStateEntry);
            });
            return formStateArray;
        }

        getServiceRatesForArea().then((serviceRates: Array<SecondFormRowModel>) => {
            if (serviceRates.length == 0) {
                setFormState([initialFormState])
                setFormErrorState([initialErrorState])
            }
            else {
                setFormState(serviceRates);
                var formErrorState: Array<SecondFormRowErrorModel> = [];
                serviceRates.forEach(serviceRate => {
                    var newErrorState: SecondFormRowErrorModel = {
                        isFirstServiceRateError: false,
                        isFirstServiceRateTouched: false,
                        isFirstServiceRatePercentageError: false,
                        isFirstServiceRatePercentageTouched: false,
                        isSecondServiceRateError: false,
                        isSecondServiceRateTouched: false,
                        isSecondServiceRatePercentageError: false,
                        isSecondServiceRatePercentageTouched: false
                    }
                    formErrorState.push(newErrorState);
                });
                setFormErrorState(formErrorState)
            }
        });

    }, []);

    const onFormSubmit = () => {
        console.log("Second form submitted");
        console.log("Second form state : ");
        console.log(formState);
        setIsFormSubmitted(true);
        if (formErrorState.filter(x => x.isFirstServiceRateError || x.isFirstServiceRatePercentageError || x.isSecondServiceRateError || x.isSecondServiceRatePercentageError)?.length > 0) {
            console.log("Errors found in form hence cannot submit");
        } else {
            props.onSecondFormSubmitted(formState);
        }
    }

    const onAddRowButtonClick = () => {
        console.log("Add row button clicked");
        var newState = [...formState];
        var newStateRecord: SecondFormRowModel = {
            firstServiceRate: 0,
            firstServiceRatePercentage: 0,
            secondServiceRate: 0,
            secondServiceRatePercentage: 0
        }
        newState.push(newStateRecord);
        setFormState(newState);
        var newErrorState = [...formErrorState];
        var newErrorStateRecord: SecondFormRowErrorModel = {
            isFirstServiceRateError: false,
            isFirstServiceRateTouched: false,
            isFirstServiceRatePercentageError: false,
            isFirstServiceRatePercentageTouched: false,
            isSecondServiceRateError: false,
            isSecondServiceRateTouched: false,
            isSecondServiceRatePercentageError: false,
            isSecondServiceRatePercentageTouched: false
        }
        newErrorState.push(newErrorStateRecord);
        setFormErrorState(newErrorState);
    }

    const onDeleteRowButtonClick = (index: number) => {
        console.log("Delete row button clicked");
        var newState = [...formState];
        newState.splice(index, 1);
        setFormState(newState);
        var newErrorState = [...formErrorState];
        newErrorState.splice(index, 1);
        setFormErrorState(newErrorState);
    }

    const onFirstServiceRateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var intValue = Number.parseInt(value);
        console.log("Index for first service rate change : " + index);
        var newState = [...formState];
        newState[index].firstServiceRate = intValue;
        setFormState(newState);
        var newErrorState = [...formErrorState];
        newErrorState[index].isFirstServiceRateError = (intValue < 0 || isNaN(intValue));
        newErrorState[index].isFirstServiceRateTouched = (intValue < 0 || isNaN(intValue));
        setFormErrorState(newErrorState);

    }
    const onFirstServiceRatePercentageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        var intValue = Number.parseInt(value);
        newState[index].firstServiceRatePercentage = intValue;
        setFormState(newState);
        var newErrorState = [...formErrorState];
        newErrorState[index].isFirstServiceRatePercentageError = (intValue < 0 || isNaN(intValue) || intValue > 100);
        newErrorState[index].isFirstServiceRatePercentageTouched = (intValue < 0 || isNaN(intValue) || intValue > 100);
        setFormErrorState(newErrorState);
    }
    const onSecondServiceRateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        var intValue = Number.parseInt(value);
        newState[index].secondServiceRate = intValue;
        setFormState(newState);
        var newErrorState = [...formErrorState];
        newErrorState[index].isSecondServiceRateError = (intValue < 0 || isNaN(intValue));
        newErrorState[index].isSecondServiceRateTouched = (intValue < 0 || isNaN(intValue));
        setFormErrorState(newErrorState);
    }
    const onSecondServiceRatePercentageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        var intValue = Number.parseInt(value);
        newState[index].secondServiceRatePercentage = intValue;
        setFormState(newState);
        var newErrorState = [...formErrorState];
        newErrorState[index].isSecondServiceRatePercentageError = (intValue < 0 || isNaN(intValue) || intValue > 100);
        newErrorState[index].isSecondServiceRatePercentageTouched = (intValue < 0 || isNaN(intValue) || intValue > 100);
        setFormErrorState(newErrorState);
    }

    return (
        <>
            <Header>Service Rates</Header>
            <Form onSubmit={onFormSubmit}>
                {
                    formState.map((row: SecondFormRowModel, index: number) => {
                        return (
                            <Grid key={index} className={styles.formRow}>
                                <div style={{ width: '15%' }}>
                                    <label>Service Rate 1</label>
                                    <input
                                        type="number"
                                        name={`firstServiceRate_${index}`}
                                        min={0}
                                        placeholder="First service rate"
                                        value={formState[index].firstServiceRate}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFirstServiceRateChange(index, event)}
                                    />
                                    {(isFormSubmitted || formErrorState[index].isFirstServiceRateTouched) && formErrorState[index].isFirstServiceRateError && <span className={styles.errorMessageSpan}>Invalid!</span>}
                                </div>
                                <div style={{ width: '15%' }}>
                                    <label>Service Rate 1 %</label>
                                    <input
                                        type="number"
                                        name={`firstServiceRatePercentage_${index}`}
                                        min={0}
                                        max={100}
                                        placeholder="First service rate %"
                                        value={row.firstServiceRatePercentage}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFirstServiceRatePercentageChange(index, event)}
                                    />
                                    {(isFormSubmitted || formErrorState[index].isFirstServiceRatePercentageTouched) && formErrorState[index].isFirstServiceRatePercentageError && <span className={styles.errorMessageSpan}>Invalid!</span>}
                                </div>
                                <div style={{ width: '15%' }}>
                                    <label>Service Rate 2</label>
                                    <input
                                        type="number"
                                        name={`secondServiceRate_${index}`}
                                        min={0}
                                        placeholder="Second service rate"
                                        value={row.secondServiceRate}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSecondServiceRateChange(index, event)}
                                    />
                                    {(isFormSubmitted || formErrorState[index].isSecondServiceRateTouched) && formErrorState[index].isSecondServiceRateError && <span className={styles.errorMessageSpan}>Invalid!</span>}
                                </div>
                                <div style={{ width: '15%' }}>
                                    <label>Service Rate 2 %</label>
                                    <input
                                        type="number"
                                        name={`secondServiceRatePercentage_${index}`}
                                        min={0}
                                        max={100}
                                        placeholder="Second service rate %"
                                        value={row.secondServiceRatePercentage}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSecondServiceRatePercentageChange(index, event)}
                                    />
                                    {(isFormSubmitted || formErrorState[index].isSecondServiceRatePercentageTouched) && formErrorState[index].isSecondServiceRatePercentageError && <span className={styles.errorMessageSpan}>Invalid!</span>}
                                </div>
                                {formState.length > 1 &&
                                    <div className={styles.actionDiv}>
                                        <Button type="button" color="red" onClick={() => onDeleteRowButtonClick(index)}>Delete</Button>
                                    </div>
                                }
                                {index == formState.length - 1 &&
                                    <div className={styles.actionDiv}>
                                        <Button type="button" color="green" onClick={() => onAddRowButtonClick()}>Add</Button>
                                    </div>
                                }
                            </Grid>
                        )
                    })
                }
                <br />
                <br />
                <br />
                <br />
                <Button color="blue" type="submit">Submit</Button>
            </Form>
        </>
    );

}