
export interface ICreatePlaceMenuItem {
    name: String
    image?: Express.Multer.File;
    place: any
}
export interface IUpdatePlaceMenuItem {
    id: number
    name?: string
    image?: Express.Multer.File;
}
export interface IGetMenuItemsByName {
    id: number
    name: String
}