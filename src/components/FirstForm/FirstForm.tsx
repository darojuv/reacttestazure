import { useForm } from "react-hook-form";
import { Button, Form, Grid, GridColumn, Input, Label } from "semantic-ui-react";
import { FirstFormSchema } from "./FirstFormSchema";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";

export interface FirstFromProps {
    onFirstDropDownValueSelected : (value: string) => void,
    onSecondDropDownValueSelected : (value: string) => void,
    onThirdDropDownValueSelected : (value: string) => void,
    onFirstFormSubmitted : () => void;
} 

export const FirstForm = (props  : FirstFromProps) => {

    const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm();

    const onFormSubmit = (data: any) => {
        console.log("Form submitted");
        console.log(data);
        props.onFirstFormSubmitted();
    }

    const onDropDownValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log("Drop down value changed for : " + name +", new value : " + value);
        setValue(name, value);
        clearErrors(name);
        if(name.indexOf("first") > 0) {
            props.onFirstDropDownValueSelected(value);
        } else if(name.indexOf("second") > 0) {
            props.onSecondDropDownValueSelected(value);
        } else if(name.indexOf("third") > 0) {
            props.onThirdDropDownValueSelected(value);
        }
    }

    const renderFormControl = (key: any, field: any) => {
        switch(field.type) {
            case 'select': {
                return (
                    <div key={key}>
                        <Input
                            {...register(key,{ required: field.validation.required})} 
                            list="dropDownListOptions" 
                            placeholder={field.label} 
                            name={key} 
                            onChange={onDropDownValueChange} />
                        <datalist id='dropDownListOptions'>
                            <option value='Option 1'>Option 1</option>
                            <option value='Option 2'>Option 2</option>
                            <option value='Option 3'>Option 3</option>
                        </datalist>
                        <ErrorMessage
                            errors={errors}
                            name={key}
                            render={({message}) => <div><Label basic color="red" pointing="above" >{message}</Label></div>} 
                        />
                    </div>        
                );    
            }
            default: return null;
        }
    }

    return(
        <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid>
                {Object.entries(FirstFormSchema).map(([key, field]) => renderFormControl(key, field))}
                <div>
                    <Button type="submit" color="blue">Submit</Button>
                </div>  
            </Grid>  
        </Form>    
    );

}