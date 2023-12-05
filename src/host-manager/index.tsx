import { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import Popup from '../popup';
import Title from '../shared/title';
import List from '../shared/list';
import AddButton from '../shared/add-button';
import { QUERY_KEY } from './constants';
import { HostService } from './service';
import { AddHostForm } from './add-host-form';

import style from './index.module.css';

const HostManager: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    const { isLoading, isSuccess, data, refetch } = useQuery(
        QUERY_KEY.GET_HOSTS,
        HostService.getHosts,
    );

    const toggleStateMutation = useMutation({
        mutationFn: HostService.toggleHostState,
        onSuccess: () => {
            refetch();
        },
    });

    const toggleHost = (host: string, isEnabled: boolean): void => {
        toggleStateMutation.mutate({ host, enabled: isEnabled });
    };

    if (isLoading) {
        return null;
    }

    if (!isSuccess) {
        return (
            <p>An error occurred :(</p>
        )
    }

    return (
         <div>
            <div className={style.moduleHeader}>
                <Title>Hosts</Title>

                <AddButton onClick={open} />
                <Popup isOpened={isOpened} close={close}>
                    <Title sx={{ mb: 4 }}>Add new host</Title>
                    <AddHostForm onSubmit={close} />
                </Popup>
            </div>
             <List
                 items={data}
                 onToggle={(name, checked) => toggleHost(name, checked)}
                 // deleteItem={(name) => setModuleNameToDelete(name)}
             />
        </div>
    );
};

export default HostManager;
