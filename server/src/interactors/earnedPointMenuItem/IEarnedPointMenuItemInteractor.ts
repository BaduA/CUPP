import { ICreateEarnedPointMenuItem } from "../../entities/interfaces/EarnedPointMenuItem";
import {  ICreateFranchisePlace, ICreatePlace, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";

export interface IEarnedPointMenuItemInteractor {
  createEarnedPointMenuItem(input: ICreateEarnedPointMenuItem):any
}
