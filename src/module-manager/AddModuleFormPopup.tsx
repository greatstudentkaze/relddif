import { FC } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import Title from '../shared/title';
import Popup from '../popup';
import InputField from '../shared/Input-field';

import { AddModuleFormProps } from './interface';
import { AddModulePayload } from './service';

import style from './index.module.css';

const INPUT_RULES = {
    moduleName: {required: 'Module name is required'},
    localPath: {required: 'Local path is required'},
};

const AddModuleFormPopup: FC<AddModuleFormProps> = ({isOpened, onSubmitForm, close}) => {
    const methods = useForm<AddModulePayload>();
    const { control, handleSubmit, reset, formState: {errors} } = methods;
    
    const onSubmit = (data: AddModulePayload) => {
        onSubmitForm(data);
        
        reset({
            moduleName: "",
            localPath: ""
        });
    }
    
    return(
        <Popup isOpened={isOpened} handleClose={close}>
            <Title>
                Add new module
            </Title>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name="moduleName"
                    control={control}
                    error={errors.moduleName}
                    rules={INPUT_RULES.moduleName}
                    label="Module name"
                />
                <InputField
                    name="localPath"
                    control={control}
                    error={errors.localPath}
                    rules={INPUT_RULES.localPath}
                    label="Local path"
                />
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </Popup>
    );
};

export default AddModuleFormPopup;