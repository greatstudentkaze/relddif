import { api } from '../shared/api';
import { Command } from './constants';

export interface UpdateCapturingStatePayload {
    command: Command;
}

export interface CapturingState {
    enabled: boolean;
}

export interface GetAllNetworkServicesResponse {
    selected: string;
    items: string[];
}

export class CapturingService {
    static getState = async (): Promise<CapturingState> => {
        try {
            const { data } = await api.get<CapturingState>('capturing');

            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static updateState = async (payload: UpdateCapturingStatePayload): Promise<void> => {
        try {
            await api.post('capturing', payload);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static getAllNetworkServices = async (): Promise<GetAllNetworkServicesResponse> => {
        try {
            const { data } = await api.get<GetAllNetworkServicesResponse>('network-services');

            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static updateSelectedNetworkService = async (networkService: string): Promise<void> => {
        try {
            await api.post('network-services', {
                name: networkService
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}
