import { FC, useState, MouseEvent } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import styles from './index.module.css';

export function ItemActionsMenu({ moduleName, deleteItem }: { moduleName: string; deleteItem: (name: string) => void; }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        deleteItem(moduleName);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                aria-label="Actions"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/*<MenuItem onClick={handleClose}>Edit</MenuItem>*/}
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
        </div>
    );
}


interface ListProps {
    items: Record<string, { enabled: boolean; }>;
    onToggle: (name: string, checked: boolean) => void;
    deleteItem: (name: string) => void;
}

const List: FC<ListProps> = ({ items, onToggle, deleteItem }) => {
    if (!items) {
        return (
            <p>No items</p>
        );
    }

    return (
        <FormGroup>
            {Object.entries(items).map(([name, { enabled }]) => (
                <div key={name} className={styles.item}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={name}
                        checked={enabled}
                        onChange={(_, checked) => onToggle(name, checked)}
                    />
                    <ItemActionsMenu moduleName={name} deleteItem={deleteItem} />
                </div>
            ))}
        </FormGroup>
    );
}

export default List;
