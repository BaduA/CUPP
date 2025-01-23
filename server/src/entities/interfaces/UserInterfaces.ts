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
    id: number
    name?: string
    lastname?: string
    username?: string
    email?: string
    password?: string
    phoneNumber?: string
}
export interface IChangeProfilePicture {
    id: number
    profilePicture: Express.Multer.File
}
export interface IChangePassword {
    id: number
    lastPassword: string
    newPassword: string
}
export interface ISignIn {
    username?: string
    email?: string
    password: string
}

export interface IUserPoint{
    userId: number
    point : number
}