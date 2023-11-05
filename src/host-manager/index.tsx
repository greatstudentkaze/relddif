import { FC, useState } from 'react';

import Popup from '../popup';
import Title from '../shared/title';
import List from '../shared/list';
import AddButton from '../shared/add-button';

import style from './index.module.css';

const HostManager: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    return (
         <div>
            <div className={style.moduleHeader}>
                <Title>
                    Hosts
                </Title>
                <AddButton onClickOpen={open} />
                <Popup isOpened={isOpened} handleClose={close}>
                    <h2>Add new host</h2>
                </Popup>
            </div>
            <List />
        </div>
    );
};

export default HostManager;