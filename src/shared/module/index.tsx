import { FC } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Popup from '../popup';

import { ModuleProps } from './interfaces';

import style from './index.module.scss';

const Module: FC<ModuleProps> = ({ moduleName }) => {
    return (
        <section className={style.module}>
            <header className={style.moduleHeader}>
                <h2 className={style.title}>{moduleName}</h2>
                <Popup content={<h1>imagine there's a form here</h1>} />
            </header>
            <FormGroup>
                {/* hardcode */}
                <FormControlLabel control={<Checkbox />} label="WorksManagement" />
                <FormControlLabel control={<Checkbox />} label="DocFine" />
                <FormControlLabel control={<Checkbox />} label="Vehicle" />
            </FormGroup>
        </section>
    );
};

export default Module;