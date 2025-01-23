import { ICreatePlacePromotion } from "../../entities/interfaces/PlacePromotionInterfaces";

export interface IPlacePromotionInteractor {
    createPlacePromotion(input: ICreatePlacePromotion ): any;
    deletePlacePromotion(id: number): any
    updatePlacePromotion(): any
    getPlacePromotions(placeId: number): any
    getPlacePromotionById(promotionId: number): any
    getPlacePromotionsByName(placeId: number, promotionName:string):any
    getPlacePromotionsByPoint(placeId: number, pointValue:number): any
}