import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async delete(file: string, folder: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { LocalStorageProvider }