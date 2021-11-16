interface ICreateUserDTO {
    id?: string;
    name: string;
    password: string;
    email: string;
    avatar?: string;
    driver_licence: string;
}


export { ICreateUserDTO };