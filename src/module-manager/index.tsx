import { FC, useState } from 'react';

import Popup from '../popup';
import Title from '../shared/title';
import List from '../shared/list';
import OpenButton from '../shared/open-button';

import style from './index.module.css';

const ModuleManager: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened(true);
    const handleClose = () => setIsOpened(false);

    return (
        <div>
            <div className={style.moduleHeader}>
                <Title>
                    Modules
                </Title>
                <OpenButton handleOpen={handleOpen} />
                <Popup isOpened={isOpened} handleClose={handleClose}>
                    <h2>Add new module</h2>
                </Popup>
            </div>
            <List />
        </div>
    );
};

export default ModuleManager;