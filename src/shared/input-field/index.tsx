import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

import {InputFieldProps} from './interface';

const InputField: FC<InputFieldProps> = ({
    name,
    control,
    rules,
    label,
    error,
    autoFocus
}) => {
    return(
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange } }) => (
                <TextField
                    autoFocus={autoFocus}
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    label={label}
                    variant="standard"
                />
            )}
        />
    );
};

export default InputField;
