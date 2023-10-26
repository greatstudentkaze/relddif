import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { PopupProps } from './interface';

import OpenButton from '../shared/open-button';

import style from './index.module.css';

const Popup: FC<PopupProps> = ({children}) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  return (
    <div>
      <OpenButton handleOpen={(handleOpen)} />
      <Modal
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalBox}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;