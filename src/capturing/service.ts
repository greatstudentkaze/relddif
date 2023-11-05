import { api } from '../shared/api';
import { Command } from './constants';

export interface UpdateCapturingStatePayload {
    command: Command;
}

export interface CapturingState {
    enabled: boolean;
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
}
