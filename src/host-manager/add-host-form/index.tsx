import { FC } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import InputField from '../../shared/input-field';
import { QUERY_KEY } from '../constants';
import { AddHostPayload, HostService } from '../service';

import styles from './index.module.css';

const INPUT_RULES = {
    host: { required: 'Host is required' },
};

interface AddHostFormProps {
    onSubmit?: () => void;
}

export const AddHostForm: FC<AddHostFormProps> = ({ onSubmit: onSubmitCallback }) => {
    const methods = useForm<AddHostPayload>();
    const { control, handleSubmit, reset, formState: { errors } } = methods;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: HostService.addHost,
        onSuccess: () => {
            reset({
                host: ''
            });

            queryClient.invalidateQueries({ queryKey: QUERY_KEY.GET_HOSTS });

            onSubmitCallback?.();
        },
    });

     const onSubmit = ({ host }: AddHostPayload): void => {
        mutation.mutate({ host });
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
                autoFocus
                name="host"
                control={control}
                error={errors.host}
                rules={INPUT_RULES.host}
                label="Host"
            />
            <Button sx={{ mt: 1.75 }} type="submit" variant="contained">Submit</Button>
        </form>
    );
};
