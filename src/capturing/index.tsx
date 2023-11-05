import { FC } from 'react';
import Button from '@mui/material/Button';
// import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface CapturingProps {
    className?: string;
}

const Capturing: FC<CapturingProps> = ({ className }) => {
    return (
        <Button
            className={className}
            variant="contained"
            endIcon={<CloseIcon />}
        >
            Capturing Off
        </Button>
    );
};

export default Capturing;
