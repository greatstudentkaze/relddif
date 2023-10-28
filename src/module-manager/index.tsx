import { FC } from 'react';

import Popup from '../popup';
import Title from '../shared/title';
import List from '../shared/list';

import style from './index.module.css';

const ModuleManager: FC = () => {
    return (
        <div>
            <div className={style.moduleHeader}>
                <Title moduleName="Modules" />
                <Popup>
                    <h2>Add new module</h2>
                </Popup>
            </div>
            <List />
        </div>
    );
};

export default ModuleManager;