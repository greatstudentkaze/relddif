import { FC, PropsWithChildren } from 'react';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

interface TitleProps {
    className?: string;
    variant?: Variant;
}

const Title: FC<PropsWithChildren<TitleProps>> = ({
    variant = 'h4',
    className,
    children
}) => {
    return(
        <Typography className={className} variant={variant} component="h2">
            {children}
        </Typography>
    );
};

export default Title;
