
export interface ICreatePlaceMenuItemVariation {
    size:string
    price: number
    pointValue:number
    isWithDiscount: boolean
    menuItemId:number
}
export interface IUpdatePlaceMenuItemVariation {
    id: number
    size?:string
    price?: number
    pointValue?:number
}
