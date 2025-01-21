export interface ICreatePlaceImages {
    files: Express.Multer.File[];
    placeId:number;
}
export interface ICreatePlaceImage {
    file: Express.Multer.File;
    placeId:number;
}
  