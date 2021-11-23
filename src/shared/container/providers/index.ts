import { container } from "tsyringe";

import { IDateProvide } from "./DateProvider/IDateProvider";
import { DaysDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvide>(
    "DayjsDateProvider",
    DaysDateProvider
)