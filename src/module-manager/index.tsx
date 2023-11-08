import { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { ModuleService, AddModulePayload } from './service';
import Popup from '../popup';
import Title from '../shared/title';
import List from '../shared/list';
import AddButton from '../shared/add-button';
import InputField from '../shared/Input-field';

import style from './index.module.css';

const ModuleManager: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const methods = useForm();
    const { control, handleSubmit, reset } = methods;

    const { isLoading, isSuccess, data, refetch } = useQuery(
        'modules',
        ModuleService.getModules,
    );

    const mutation = useMutation({
        mutationFn: ModuleService.toggleModuleState,
        onSuccess: () => {
            refetch();
        },
    });

    const addModuleMutation = useMutation({
        mutationFn: ModuleService.addModule,
        onSuccess: () => {
            refetch();
        },
    });

    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    if (isLoading) {
        return null;
    }

    if (!isSuccess) {
        return (
            <p>An error occurred :(</p>
        )
    }

    const toggleModule = (module: string, isEnabled: boolean): void => {
        mutation.mutate({ moduleName: module, enabled: isEnabled });
    };

    const onSubmit = ({moduleName, localPath}: AddModulePayload): void => {
        addModuleMutation.mutate({ moduleName, localPath });
        if (isSuccess) {
            reset({
                moduleName: "",
                localPath: ""
            });
        }
    }

    return (
        <div>
            <div className={style.moduleHeader}>
                <Title>
                    Modules
                </Title>
                <AddButton onClickOpen={open} />
                <Popup isOpened={isOpened} handleClose={close}>
                    <Title>
                        Add new module
                    </Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={style.form}>
                            <InputField
                                fieldName="moduleName"
                                control={control}
                                rules={{required: 'Module name is required'}}
                                label="Module name"
                            />
                            <InputField
                                fieldName="localPath"
                                control={control}
                                rules={{required: 'Local path is required'}}
                                label="Local path"
                            />
                        </div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                </Popup>
            </div>
            <List
                items={data}
                onToggle={(name, checked) => toggleModule(name, checked)}
            />
        </div>
    );
};

export default ModuleManager;
