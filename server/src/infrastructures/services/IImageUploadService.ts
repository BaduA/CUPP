
export interface IImageUploadService {
    uploadSinglePdf(file:Express.Multer.File,rootFolderName: string): Promise<string> ;
    uploadSingleImage(file:Express.Multer.File,rootFolderName: string): Promise<string> ;
    uploadManyImages(photos:Express.Multer.File[],rootFolderName: string):Promise<string[] | void>;
    delete(fileName:string):boolean;
    get(key:string):Promise<string>;
  }
  