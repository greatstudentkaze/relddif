import { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CapturingService } from './service';
import { Command } from './constants';

interface CapturingProps {
    className?: string;
}

const Capturing: FC<CapturingProps> = ({ className }) => {
    const { isLoading, isSuccess, data, refetch } = useQuery(
        'capturing',
        CapturingService.getState
    );

    const mutation = useMutation({
        mutationFn: CapturingService.updateState,
        onSuccess: () => {
            refetch();
        },
    });

    if (isLoading) {
        return null;
    }

    if (!isSuccess) {
        return (
            <p>An error occurred :(</p>
        )
    }

    const { enabled } = data;

    const handleClick = () => {
        mutation.mutate({
            command: enabled
                ? Command.Disable
                : Command.Enable
        });
    };

    return (
        <Button
            className={className}
            variant="contained"
            endIcon={enabled ? <CheckIcon /> : <CloseIcon />}
            onClick={handleClick}
        >
            Capturing {enabled ? 'On' : 'Off'}
        </Button>
    );
};

export default Capturing;
