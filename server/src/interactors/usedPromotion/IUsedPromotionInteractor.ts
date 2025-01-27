export interface IUsedPromotionInteractor{
    createUsedPromotion(userRecordId:number, promotionId:number):any
    deleteUsedPromotion(id:number):any
}