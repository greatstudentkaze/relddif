import { FC, PropsWithChildren } from 'react';
import { Typography } from '@mui/material';
import { TypographyOwnProps } from '@mui/material/Typography/Typography';

interface TitleProps {
    className?: string;
    variant?: TypographyOwnProps['variant'];
    sx?: TypographyOwnProps['sx']
}

const Title: FC<PropsWithChildren<TitleProps>> = ({
    variant = 'h4',
    className,
    sx,
    children
}) => {
    return(
        <Typography sx={sx} className={className} variant={variant} component="h2">
            {children}
        </Typography>
    );
};

export default Title;
