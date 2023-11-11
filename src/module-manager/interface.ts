import { AddModulePayload } from "./service";

export interface AddModuleFormProps {
    isOpened: boolean,
    onSubmitForm: (data: AddModulePayload) => void,
    close: () => void,
}
