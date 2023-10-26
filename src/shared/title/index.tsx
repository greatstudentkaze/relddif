import { FC } from "react";

import { TitleProps } from "./interface";
import style from './index.module.css';

const Title: FC<TitleProps> = ({moduleName}) => {
    return(
        <h2 className={style.title}>{moduleName}</h2>
    );
};

export default Title;