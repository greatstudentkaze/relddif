import { FC } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const List: FC = () => {
    return (
        <FormGroup>
            {/* hardcode */}
            <FormControlLabel control={<Checkbox />} label="WorksManagement" />
            <FormControlLabel control={<Checkbox />} label="DocFine" />
            <FormControlLabel control={<Checkbox />} label="Vehicle" />
        </FormGroup>
    );
}

export default List;