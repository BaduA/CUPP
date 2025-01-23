import { ICreatePlaceMenuItem, IGetMenuItemsByName, IUpdatePlaceMenuItem } from "../../entities/interfaces/PlaceMenuItemInterfaces";

export interface IPlaceMenuItemInteractor{
    createPlaceMenuItem(input:ICreatePlaceMenuItem):any
    updatePlaceMenuItem(input:IUpdatePlaceMenuItem):any
    deletePlaceMenuItem(id:number):any
    getPlaceMenuItemsByName(input: IGetMenuItemsByName):any
    getAllMenuItems(id:number):any
    getMenuItemById(id:number):any
}