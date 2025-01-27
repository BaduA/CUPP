import { ICreateFranchisePlace, ICreatePlace, IFindClosestPlace, IPointTransaction, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";

export interface IPlaceInteractor {
  createPlace(input: ICreatePlace): any;
  createWithFranchisePlace(input: ICreateFranchisePlace): any;
  findByName(name: string): any;
  findWithId(id: number, includeData?: any): any;
  findWithLocation(city: String, district?: string): any;
  findClosest(input: IFindClosestPlace): any;
  updatePlace(input: IUpdatePlace): any
  addGivenPoints(input: IPointTransaction): any
  addPromotionPoints(input: IPointTransaction): any
  deletePlace(id: number): any
  checkIsComplete(id: number): any
}
