export const FirstFormSchema = {
    firstDropDown: {
        label: 'First Dropdown List',
        type: 'select',
        validation: {
            required: 'Please select first dropdown list value'
        }
    },
    secondDropDown: {
        label: 'Second Dropdown List',
        type: 'select',
        validation: {
            required: 'Please select second dropdown list value'
        }
    },
    thirdDropDown: {
        label: 'Third Dropdown List',
        type: 'select',
        validation: {
            required: 'Please select third dropdown list value'
        }
    }
};