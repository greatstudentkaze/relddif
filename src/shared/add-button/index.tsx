import { FC } from "react";
import IconButton from '@mui/material/IconButton';
import Icon from "@mui/material/Icon";

import { AddButtonProps } from "./interface";

const AddButton: FC<AddButtonProps> = ({
    onClick
}) => {
    return (
        <IconButton onClick={onClick} aria-label="open" size="large">
            <Icon fontSize="inherit" color="primary">add_circle</Icon>
        </IconButton>
    );
};

export default AddButton;
