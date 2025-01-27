import { ICreatePlaceMenuItemVariation, IUpdatePlaceMenuItemVariation } from "../../entities/interfaces/PlaceMenuItemVariationInterfaces";
import { ICreatePlacePromotion } from "../../entities/interfaces/PlacePromotionInterfaces";

export interface IPlaceMenuItemVariationInteractor {
    createPlaceMenuItemVariation(input: ICreatePlaceMenuItemVariation): any
    deletePlaceMenuItemVariation(id: number): any
    updatePlaceMenuItemVariation(input: IUpdatePlaceMenuItemVariation): any
    getPlaceMenuVariationById(id:number): any
    getPlaceMenuVariations(menuItemId:number): any
}