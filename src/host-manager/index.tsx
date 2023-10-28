import { FC } from "react";

import Title from "../shared/title";
import Popup from "../popup";
import List from "../shared/list";

import style from './index.module.css';

const HostManager: FC = () => {
    return (
         <div>
            <div className={style.moduleHeader}>
                <Title moduleName="Hosts" />
                <Popup>
                    <h2>Add new host</h2>
                </Popup>
            </div>
            <List />
        </div>
    );
};

export default HostManager;