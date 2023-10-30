import { FC, PropsWithChildren } from "react";
import { Typography } from "@mui/material";

const Title: FC<PropsWithChildren> = ({children}) => {
    return(
        <Typography variant="h4" component="h2">
            {children}
        </Typography>
    );
};

export default Title;