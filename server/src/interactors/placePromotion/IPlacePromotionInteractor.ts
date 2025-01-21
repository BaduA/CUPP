export interface IPlacePromotionInteractor{
    createPlacePromotion():any;
    deletePlacePromotion(id:number):any
    updatePlacePromotion():any
    getPlacePromotions(placeId:number):any
    getPlacePromotionsByPoint(placeId:number):any
}