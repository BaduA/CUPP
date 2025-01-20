export interface ICreatePlaceImages {
    files: Express.Multer.File[];
    placeId:number;
    rootFolderName:string;
}
export interface ICreatePlaceImage {
    file: Express.Multer.File;
    placeId:number;
    rootFolderName:string;
}
  