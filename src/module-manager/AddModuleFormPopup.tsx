import { FC } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import Title from '../shared/title';
import Popup from '../popup';
import InputField from '../shared/input-field';

import { ModuleService, AddModulePayload } from './service';
import { AddModuleFormProps } from './interface';

import style from './index.module.css';

const INPUT_RULES = {
    moduleName: {required: 'Module name is required'},
    localPath: {required: 'Local path is required'},
};

const AddModuleFormPopup: FC<AddModuleFormProps> = ({isOpened, close}) => {
    const methods = useForm<AddModulePayload>();
    const { control, handleSubmit, reset, formState: {errors} } = methods;

    const { isLoading, isSuccess, data, refetch } = useQuery(
        'modules',
        ModuleService.getModules,
    );

    const mutation = useMutation({
        mutationFn: ModuleService.addModule,
        onSuccess: () => {
            reset({
                moduleName: "",
                localPath: ""
            });
            
            refetch();
        },
    });

     const onSubmit = ({moduleName, localPath}: AddModulePayload): void => {
        mutation.mutate({ moduleName, localPath });
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