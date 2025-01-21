
export interface ICreatePlaceMenuItem {
    name: String
    image?: Express.Multer.File;
    price: number
    pointValue: number
    size: string
    placeId: number
}
export interface IUpdatePlaceMenuItem {
    id: number
    price?: number
    pointValue?: number
}
export interface IGetMenuItemsByName {
    id: number
    name: String
}