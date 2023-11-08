import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import {InputFieldProps} from './interface';

const InputField: FC<InputFieldProps> = ({fieldName, control, rules, label}) => {
    return(
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field: { value, onChange } }) => (
                <TextField
                    value={value}
                    onChange={onChange}
                    label={label}
                    variant="standard"
                />
            )}
        />
    );
};

export default InputField;