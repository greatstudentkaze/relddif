import { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { PopupProps } from './interface';

import style from './index.module.css';

const Popup: FC<PopupProps> = ({ children, isOpened, close }) => {
  return (
    <div>
      <Modal
        open={isOpened}
        onClose={close}
      >
        <Box className={style.modalBox}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;
