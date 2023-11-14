import { FC } from "react";
import IconButton from '@mui/material/IconButton';
import Icon from "@mui/material/Icon";

import { AddButtonProps } from "./interface";

const AddButton: FC<AddButtonProps> = ({onClickOpen}) => {
    return (
        <IconButton onClick={onClickOpen} aria-label="open" size="large">
            <Icon fontSize="inherit" color="primary">Add</Icon>
        </IconButton>
    );
};

export default AddButton;
