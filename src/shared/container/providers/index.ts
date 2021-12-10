import { container } from "tsyringe";

import { IDateProvide } from "./DateProvider/IDateProvider";
import { DaysDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvide>(
    "DayjsDateProvider",
    DaysDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider", 
    new EtherealMailProvider()
);