import { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Controller, FormProvider, useForm  } from "react-hook-form";
import { Button, TextField } from "@mui/material";

import { ModuleService } from './service';
import Popup from '../popup';
import Title from '../shared/title';
import List from '../shared/list';
import AddButton from '../shared/add-button';

import style from './index.module.css';

interface addModuleType {
    moduleName: string,
    localPath: string,
}

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

    const onSubmit = ({moduleName, localPath}: addModuleType): void => {
        addModuleMutation.mutate({ moduleName, localPath });
        reset({
            moduleName: "",
            localPath: ""
        });
    }

    return (
        <div>
            <div className={style.moduleHeader}>
                <Title>
                    Modules
                </Title>
                <AddButton onClickOpen={open} />
                <Popup isOpened={isOpened} close={close}>
                    <h2>Add new module</h2>
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
