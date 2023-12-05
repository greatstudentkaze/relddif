import { Control, FieldError } from 'react-hook-form';

interface InputFieldRules {
    required: string,
}

export interface InputFieldProps {
    name: string,
    control: Control,
    rules: InputFieldRules,
    label: string,
    error?: FieldError | undefined,
    autoFocus?: boolean;
}
