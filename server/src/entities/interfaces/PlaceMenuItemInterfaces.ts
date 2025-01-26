
export interface ICreatePlaceMenuItem {
    name: String
    image?: Express.Multer.File;
    price: number
    pointValue: number
    size: string
    place: any
}
export interface IUpdatePlaceMenuItem {
    id: number
    name?: string
    price?: number
    pointValue?: number
    image?: Express.Multer.File;
}
export interface IGetMenuItemsByName {
    id: number
    name: String
}