export interface ISignUp {
    name: string
    lastname: string
    username: string
    email: string
    password: string
    phoneNumber: string
    profilePicture?: Express.Multer.File
}
export interface IUpdateUser {
    id: string
    name?: string
    lastname?: string
    username?: string
    email?: string
    password?: string
    phoneNumber?: string
    verified?:boolean
}
export interface IChangeProfilePicture {
    id: string
    profilePicture: Express.Multer.File
}
export interface IChangePassword {
    id: string
    lastPassword: string
    newPassword: string
}
export interface ISignIn {
    username?: string
    email?: string
    password: string
}

export interface IUserPoint{
    userId: string
    point : number
}