import { FC } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import Title from '../shared/title';
import Popup from '../popup';
import InputField from '../shared/input-field';
import { QUERY_KEY } from './constants';

import { ModuleService, AddModulePayload } from './service';
import { AddModuleFormProps } from './interface';

import style from './index.module.css';

const INPUT_RULES = {
    moduleName: {required: 'Module name is required'},
    localPath: {required: 'Local path is required'},
};

const AddModuleFormPopup: FC<AddModuleFormProps> = ({isOpened, close}) => {
    const methods = useForm<AddModulePayload>({
        values: {
            moduleName: '',
            localPath: ''
        }
    });
    const { control, handleSubmit, reset, formState: {errors} } = methods;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ModuleService.addModule,
        onSuccess: () => {
            reset({
                moduleName: "",
                localPath: ""
            });

            queryClient.invalidateQueries({ queryKey: QUERY_KEY.GET_MODULES });

            close();
        },
    });

     const onSubmit = ({moduleName, localPath}: AddModulePayload): void => {
        mutation.mutate({ moduleName, localPath });
    }

    return(
        <Popup isOpened={isOpened} close={close}>
            <Title sx={{ mb: 4 }}>
                Add new module
            </Title>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    autoFocus
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
                <Button sx={{ mt: 1.75 }} type="submit" variant="contained">Submit</Button>
            </form>
        </Popup>
    );
};

export default AddModuleFormPopup;
