import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

interface ConfirmationProps {
    isOpened: boolean;
    close: () => void;
    onResult: (result: boolean) => void;
}

export const Confirmation: FC<ConfirmationProps> = ({ isOpened, close, onResult }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCancelClick = () => {
        onResult(false);
        close();
    };

    const handleOKClick = () => {
        onResult(true);
        close();
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpened}
            onClose={close}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Do you want to delete the module?"}
            </DialogTitle>
            {/*<DialogContent>*/}
            {/*    <DialogContentText>*/}
            {/*        Let Google help apps determine location. This means sending anonymous*/}
            {/*        location data to Google, even when no apps are running.*/}
            {/*    </DialogContentText>*/}
            {/*</DialogContent>*/}
            <DialogActions>
                <Button autoFocus onClick={handleCancelClick}>
                    Cancel
                </Button>
                <Button onClick={handleOKClick} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
