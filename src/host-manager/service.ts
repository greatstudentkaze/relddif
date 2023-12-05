import { api } from '../shared/api';

// export interface AddModulePayload {
//     moduleName: string,
//     localPath: string,
// }

export type GetHostsResponse = Record<string, {
    origin: string;
    enabled: boolean;
}>;

interface ToggleHostStatePayload {
    host: string;
    enabled: boolean
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

    // static addModule = async (payload: AddModulePayload): Promise<void> => {
    //     try {
    //         await api.post('modules', payload);
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // };
    //
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
