import { api } from '../shared/api';

export interface AddModuleDTO {}

export type GetModulesResponse = Record<string, {
    remotePrefix: string;
    localPrefix: string;
    enabled: boolean;
}>;

interface ToggleModuleStatePayload {
    moduleName: string;
    enabled: boolean
}

export class ModuleService {
    static getModules = async (): Promise<GetModulesResponse> => {
        try {
            const { data } = await api.get<GetModulesResponse>('modules');

            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    // static addModule = async (payload: AddModuleDTO): Promise<void> => {
    //     try {
    //         debugger
    //         // await api.post('capturing', payload);
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // };

    static toggleModuleState = async (payload: ToggleModuleStatePayload): Promise<void> => {
        try {
            await api.post('modules/enable', payload)
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}
