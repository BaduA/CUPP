import {  ICreateFranchisePlace, ICreatePlace, IFindClosestPlace, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";

export interface IPlaceInteractor {
  createPlace(input: ICreatePlace): any;
  createWithFranchisePlace(input: ICreateFranchisePlace): any;
  findByName(name: string):any;
  findWithId(id:number,includeData?:any):any;
  findWithLocation(city:String, district?:string):any;
  findClosest(input: IFindClosestPlace):any;
  updatePlace(input: IUpdatePlace):any
  deletePlace(id:number) :any
}
