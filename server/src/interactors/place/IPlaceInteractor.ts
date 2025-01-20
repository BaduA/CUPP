import { ICreatePlace, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";

export interface IPlaceInteractor {
  create(input: ICreatePlace): any;
  findByName(name: string):any;
  findWithId(id:number):any;
  findWithLocation(city:String, district:string):any;
  updatePlace(input: IUpdatePlace):any
  deletePlace(id:number) :any
}
