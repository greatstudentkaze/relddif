import { FC } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ListProps {
    items: Record<string, { enabled: boolean; }>;
    onToggle: (name: string, checked: boolean) => void;
}

const List: FC<ListProps> = ({ items, onToggle }) => {
    if (!items) {
        return (
            <p>No items</p>
        );
    }

    return (
        <FormGroup>
            {Object.entries(items).map(([name, { enabled }]) => (
                <div key={name}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={name}
                        checked={enabled}
                        onChange={(_, checked) => onToggle(name, checked)}
                    />
                </div>
            ))}
        </FormGroup>
    );
}

export default List;
