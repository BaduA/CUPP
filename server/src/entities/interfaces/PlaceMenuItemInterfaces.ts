
export interface ICreatePlaceMenuItem {
    name: String
    image?: Express.Multer.File;
    price:number
    pointValue:number
    placeId:number
}
export interface IUpdatePlaceMenuItem {
    id:number
    name?: String
    price?:number
    pointValue?:number
}
export interface IGetMenuItemsByName {
    id:number
    name:String
}