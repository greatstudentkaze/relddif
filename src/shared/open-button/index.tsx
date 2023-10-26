import { FC } from "react";
import Icon from "@mui/material/Icon";

import { OpenButtonProps } from "./interface";

import style from './index.module.css';

const OpenButton: FC<OpenButtonProps> = ({handleOpen}) => {
    return (
        <Icon onClick={handleOpen} className={style.openPopupBtn} color="primary">add_circle</Icon>
    );
};

export default OpenButton;