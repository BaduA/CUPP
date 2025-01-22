export interface ICreatePlacePromotion {
    name: String
    image?: Express.Multer.File;
    placeId: number
    pointValue: number
}