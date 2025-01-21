import { ICreatePlaceImage,ICreatePlaceImages } from "../../entities/interfaces/PlaceImageInterfaces";

export interface IPlaceImageInteractor {
  uploadImages(input: ICreatePlaceImages): any;
  uploadImage(input: ICreatePlaceImage): any;
  getImages(placeId:number):any
  deleteImage( id:number):any
}
