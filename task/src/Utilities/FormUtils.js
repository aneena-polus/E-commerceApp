import { isPossiblePhoneNumber } from 'react-phone-number-input'

export const onFormDataChange = (setFormData) => (event) => {
    setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
    }));
};

export const validate = (fields, requiredFields, setErrors) => {
    const newErrors = {};
    requiredFields.forEach(field => {
        if (!fields[field]) newErrors[field] = true;
        if (field === "phoneNumber" && !isPossiblePhoneNumber(fields[field])) newErrors[field] = `*Enter valid phone number`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
