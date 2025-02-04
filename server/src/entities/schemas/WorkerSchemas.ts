import { z } from "zod";

const orderMenuItemVariationSchema = z.object({
    menuItemVariationId:z.number(),
    amount:z.number()
})
export const ProcessUserOrderSchema = z.object({
    userId:z.string(),
    menuItemVariations: z.array(orderMenuItemVariationSchema),
    totalMoney:z.number(),
    totalEarnedPoint:z.number(),
    placeId: z.number()
})
export const ProcessUserPromotionSchema = z.object({
    userId:z.string(),
    promotionId: z.number()
})