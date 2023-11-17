import { useEffect, useRef, useState } from "react"
import { SecondFormRowModel } from "../../models/SecondFormRowModel"
import { Button, Form, Grid, GridColumn, Input, Label } from "semantic-ui-react";
import styles from "../SecondForm/SecondForm.module.css";


export interface SecondFormProps {
    onSecondFormSubmitted: (formState: Array<SecondFormRowModel>) => void
}

export const SecondForm = (props: SecondFormProps) => {

    const initialState: SecondFormRowModel = {
        firstServiceRate: 0,
        firstServiceRatePercentage: 0,
        secondServiceRate: 0,
        secondServiceRatePercentage: 0
    }
    const [formState, setFormState] = useState<Array<SecondFormRowModel>>([initialState])

    const onFormSubmit = () => {
        console.log("Second form submitted");
        console.log("Second form state : ");
        console.log(formState);
        props.onSecondFormSubmitted(formState);
    }

    const onAddRowButtonClick = () => {
        console.log("Add row button clicked");
        setFormState([...formState, initialState]);
    }

    const onDeleteRowButtonClick = (index: number) => {
        console.log("Delete row button clicked");
        var newState = [...formState];
        newState.splice(index, 1);
        setFormState(newState);
    }

    const onFirstServiceRateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        newState[index].firstServiceRate = Number.parseInt(value);
        setFormState(newState);
    }
    const onFirstServiceRatePercentageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        newState[index].firstServiceRatePercentage = Number.parseInt(value);
        setFormState(newState);
    }
    const onSecondServiceRateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        newState[index].secondServiceRate = Number.parseInt(value);
        setFormState(newState);
    }
    const onSecondServiceRatePercentageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        var newState = [...formState];
        newState[index].secondServiceRatePercentage = Number.parseInt(value);
        setFormState(newState);
    }

    return (
        <Form onSubmit={onFormSubmit}>
            {
                formState.map((row: SecondFormRowModel, index: number) => {
                    return (
                        <Grid key={index}>
                            <div style={{ width: '15%' }}>
                                <label>Service Rate 1</label>
                                <input
                                    type="number"
                                    name={`firstServiceRate_${index}`}
                                    placeholder="First service rate"
                                    value={row.firstServiceRate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFirstServiceRateChange(index, event)}
                                />
                            </div>
                            <div style={{ width: '15%' }}>
                                <label>Service Rate 1 %</label>
                                <input
                                    type="number"
                                    name={`firstServiceRatePercentage_${index}`}
                                    placeholder="First service rate %"
                                    value={row.firstServiceRatePercentage}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFirstServiceRatePercentageChange(index, event)}
                                />
                            </div>
                            <div style={{ width: '15%' }}>
                                <label>Service Rate 2</label>
                                <input
                                    type="number"
                                    name={`secondServiceRate_${index}`}
                                    placeholder="Second service rate"
                                    value={row.secondServiceRate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSecondServiceRateChange(index, event)}
                                />
                            </div>
                            <div style={{ width: '15%' }}>
                                <label>Service Rate 2 %</label>
                                <input
                                    type="number"
                                    name={`secondServiceRatePercentage_${index}`}
                                    placeholder="Second service rate %"
                                    value={row.secondServiceRatePercentage}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSecondServiceRatePercentageChange(index, event)}
                                />
                            </div>
                            {formState.length > 1 &&
                                <div style={{ width: '5%' }} className={styles.actionDiv}>
                                    <Button color="red" onClick={() => onDeleteRowButtonClick(index)}>Delete</Button>
                                </div>
                            }
                            {index == formState.length - 1 &&
                                <div style={{ width: '5%' }} className={styles.actionDiv}>
                                    <Button color="green" onClick={() => onAddRowButtonClick()}>Add</Button>
                                </div>
                            }
                        </Grid>
                    )
                })
            }
            <br />
            <br />
            <Button color="blue" type="submit">Submit</Button>
        </Form>
    );

}