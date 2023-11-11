import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

import Title from '../../shared/title';
import Popup from '../../popup';

import { NetworkServiceSelector } from './network-service-selector';

import styles from './settings.module.css';

export const CapturingSettings = () => {
    const [isSettingsPopupOpened, setIsSettingsPopupOpened] = useState(false);

    return (
        <>
            <IconButton onClick={() => setIsSettingsPopupOpened(true)}>
                <SettingsIcon />
            </IconButton>
            <Popup
                isOpened={isSettingsPopupOpened}
                close={() => setIsSettingsPopupOpened(false)}
            >
                <Title className={styles.title} variant="h5">
                    Capturing settings
                </Title>

                <NetworkServiceSelector />
            </Popup>
        </>
    );
};
