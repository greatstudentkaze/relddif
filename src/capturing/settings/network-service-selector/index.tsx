import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { CapturingService } from '../../service';

export const NetworkServiceSelector = () => {
    const [networkService, setNetworkService] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        const newNetworkService = event.target.value as string;
        setNetworkService(newNetworkService);
        networkServiceMutation.mutate(newNetworkService);
    };

    const { isLoading, isSuccess, data } = useQuery(
        'network-services',
        CapturingService.getAllNetworkServices,
    );

    const networkServiceMutation = useMutation({
        mutationFn: CapturingService.updateSelectedNetworkService,
    });

    useEffect(() => {
        if (!isSuccess || !data) {
            return;
        }

        setNetworkService(data.selected);
    }, [isSuccess, data]);

    if (isLoading) {
        return null;
    }

    if (!isSuccess) {
        return (
            <p>An error occurred :(</p>
        )
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="adapter-label">Network service</InputLabel>
            <Select
                labelId="adapter-label"
                id="adapter"
                value={networkService}
                label="Network service"
                onChange={handleChange}
            >
                {data.items.map(networkService => (
                    <MenuItem key={networkService} value={networkService}>{networkService}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
