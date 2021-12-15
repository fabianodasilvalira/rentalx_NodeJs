import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { container } from "tsyringe";

import { IDateProvide } from "./DateProvider/IDateProvider";
import { DaysDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProvide>(
    "DayjsDateProvider",
    DaysDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider", 
    new EtherealMailProvider()
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);