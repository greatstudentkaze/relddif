import { FC } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import InputField from '../../shared/input-field';
import { UpdateModulePayload, ModuleService, Module } from '../service';

import styles from './index.module.css';

const INPUT_RULES = {
    localPath: { required: 'Local path is required' },
};

interface EditModuleFormProps {
    moduleName: string;
    onSubmit?: () => void;
    module: Module;
}

const EditModuleForm: FC<EditModuleFormProps> = ({ module, moduleName, onSubmit: onSubmitCallback }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdateModulePayload>({
        defaultValues: {
            localPath: module.localPrefix,
            moduleName
        }
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ModuleService.updateModule,
        onSuccess: () => {
            reset({
                localPath: ''
            });

            queryClient.invalidateQueries({ queryKey: moduleName });

            onSubmitCallback?.();
        },
    });

     const onSubmit = ({ localPath }: UpdateModulePayload): void => {
        mutation.mutate({ moduleName, localPath });
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
                autoFocus
                name="localPath"
                control={control}
                error={errors.localPath}
                rules={INPUT_RULES.localPath}
                label="Local path"
            />
            <Button sx={{ mt: 1.75 }} type="submit" variant="contained">Submit</Button>
        </form>
    );
};

interface EditModuleFormWrapperProps {
    moduleName: EditModuleFormProps['moduleName'];
    onSubmit?: EditModuleFormProps['onSubmit'];
}

const EditModuleFormWrapper: FC<EditModuleFormWrapperProps> = ({ moduleName, ...props }) => {
    const { isLoading, isSuccess, data } = useQuery(
        moduleName,
        () => ModuleService.getModule(moduleName),
    );

    if (isLoading) {
        return null;
    }

    if (!isSuccess) {
        return (
            <p>An error occurred :(</p>
        )
    }

    return (
        <EditModuleForm module={data} moduleName={moduleName} {...props} />
    );
};

export default EditModuleFormWrapper;
