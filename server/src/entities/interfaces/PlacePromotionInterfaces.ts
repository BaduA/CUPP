export interface ICreatePlacePromotion {
    name: String
    image?: Express.Multer.File;
    place: any
    pointValue: number
}