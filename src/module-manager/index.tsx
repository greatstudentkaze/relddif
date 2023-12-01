import { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { ModuleService } from './service';
import Title from '../shared/title';
import List from '../shared/list';
import AddButton from '../shared/add-button';
import { Confirmation } from '../shared/confirmation';
import AddModuleFormPopup from './add-module-form-popup';
import { QUERY_KEY } from './constants';

import style from './index.module.css';

const ModuleManager: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [moduleNameToDelete, setModuleNameToDelete] = useState<string | null>(null);

    const { isLoading, isSuccess, data, refetch } = useQuery(
        QUERY_KEY.GET_MODULES,
        ModuleService.getModules,
    );

    const mutation = useMutation({
        mutationFn: ModuleService.toggleModuleState,
        onSuccess: () => {
            refetch();
        },
    });

    const deleteModuleMutation = useMutation({
        mutationFn: ModuleService.deleteModule,
        onSuccess: () => {
            refetch();
        }
    });

    const handleDeleteConfirmationResult = (shouldDelete: boolean) => {
        if (shouldDelete && moduleNameToDelete) {
            deleteModuleMutation.mutate(moduleNameToDelete);
        }

        setModuleNameToDelete(null);
    };

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

    return (
        <div>
            <div className={style.moduleHeader}>
                <Title>
                    Modules
                </Title>
                <AddButton onClick={open} />
                <AddModuleFormPopup
                    isOpened={isOpened}
                    close={close}
                />
            </div>
            <List
                items={data}
                onToggle={(name, checked) => toggleModule(name, checked)}
                deleteItem={(name) => setModuleNameToDelete(name)}
            />
            <Confirmation
                isOpened={Boolean(moduleNameToDelete)}
                close={() => setModuleNameToDelete(null)}
                onResult={handleDeleteConfirmationResult}
            />
        </div>
    );
};

export default ModuleManager;
