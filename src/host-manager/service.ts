import { api } from '../shared/api';

export interface AddHostPayload {
    host: string;
    // origin?: string,
}

export type GetHostsResponse = Record<string, {
    origin: string;
    enabled: boolean;
}>;

interface ToggleHostStatePayload {
    host: string;
    enabled: boolean;
}

export class HostService {
    static getHosts = async (): Promise<GetHostsResponse> => {
        try {
            const { data } = await api.get<GetHostsResponse>('hosts');

            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static addHost = async (payload: AddHostPayload): Promise<void> => {
        try {
            await api.post('hosts', payload);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    // static deleteModule = async (moduleName: string): Promise<void> => {
    //     try {
    //         await api.delete('modules', {
    //             data: {
    //                 moduleName
    //             }
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // };

    static toggleHostState = async (payload: ToggleHostStatePayload): Promise<void> => {
        try {
            await api.post('hosts/toggle', payload)
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}
