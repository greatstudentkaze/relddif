import Button from '@mui/material/Button';
import checkedIcon from '@mui/icons-material/checkedIcon';

import style from './index.module.scss';

const Capturing = () => {
    return (
        <Button className={style.capturing} variant="contained" endIcon={<checkedIcon />}>
            Capturing Off
        </Button>
    );
};

export default Capturing;