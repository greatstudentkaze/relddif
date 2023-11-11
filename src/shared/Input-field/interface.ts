import { Control, FieldError } from 'react-hook-form';
import { AddModulePayload } from '../../module-manager/service';

interface InputFieldRules {
    required: string,
}

export interface InputFieldProps {
    name: 'moduleName' | 'localPath',
    control: Control<AddModulePayload>,
    rules: InputFieldRules,
    label: string,
    error?: FieldError | undefined,
}