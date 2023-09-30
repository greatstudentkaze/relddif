import { FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query';

import store from '../server/store.json';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const AddModuleForm = ({ refetch }) => {
    const [moduleName, setModuleName] = useState('');
    const [localPath, setLocalPath] = useState('');
    const mutation = useMutation({
        mutationFn: (module) => {
            return axios.post('http://localhost:5001/api/modules', module)
        },
        onSuccess: () => {
            setModuleName('');
            setLocalPath('');
            refetch();
        },
    })

    const handleSubmit: FormEventHandler = async (evt) => {
        evt.preventDefault();

        mutation.mutate({ moduleName, localPath });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Module name"
                variant="standard"
                value={moduleName}
                onChange={(evt) => setModuleName(evt.target.value)}
            />
            <TextField
                fullWidth
                sx={{ display: 'block', margin: '10px 0' }}
                label="Local path"
                variant="standard"
                value={localPath}
                onChange={(evt) => setLocalPath(evt.target.value)}
            />
            <Button type="submit" variant="contained">Add</Button>
        </form>
    );
};

function App() {
    // const { modules } = store;

    const { isLoading, error, data, refetch } = useQuery('repoData', () =>
        fetch('http://localhost:5001/api/modules').then(res =>
            res.json()
        )
    )

    const mutation = useMutation({
        mutationFn: (newTodo) => {
            return axios.post('http://localhost:5001/api/modules/enable', newTodo)
        },
        onSuccess: () => {
            refetch()
        }
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const toggleModule = (module: string, isEnabled: boolean): void => {
        console.log(module, isEnabled);

        mutation.mutate({ moduleName: module, enabled: isEnabled });
    };

    return (
        <>
            {Object.entries(data).map(([moduleName, { enabled }]) => {
                return (
                    <div key={moduleName}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={`${moduleName}`}
                            checked={enabled}
                            onChange={(_, checked) => toggleModule(moduleName, checked)}
                        />
                    </div>
                )
            })}
            <AddModuleForm refetch={refetch} />
        </>
    );
}

export default App;
