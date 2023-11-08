import { Control, FieldValues } from 'react-hook-form';

interface InputFieldRules {
    required: string,
}

export interface InputFieldProps {
    fieldName: string,
    control: Control<FieldValues>,
    rules: InputFieldRules,
    label: string,
}