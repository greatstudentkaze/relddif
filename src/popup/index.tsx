import { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { PopupProps } from './interface';

import style from './index.module.css';

const Popup: FC<PopupProps> = ({children, isOpened, handleClose}) => {
  return (
    <div>
      <Modal
        open={isOpened}
        onClose={handleClose}
      >
        <Box className={style.modalBox}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;