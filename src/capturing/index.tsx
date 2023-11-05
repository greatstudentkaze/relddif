import Button from '@mui/material/Button';
// import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import style from './index.module.css';

const Capturing = () => {
    return (
        <Button
            className={style.capturing}
            variant="contained"
            endIcon={<CloseIcon />}
        >
            Capturing Off
        </Button>
    );
};

export default Capturing;
