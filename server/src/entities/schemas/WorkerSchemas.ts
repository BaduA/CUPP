import { z } from "zod";

const orderMenuItemVariationSchema = z.object({
    menuItemVariationId:z.number(),
    amount:z.number()
})
export const ProcessUserOrderSchema = z.object({
    userId:z.number(),
    menuItemVariations: z.array(orderMenuItemVariationSchema),
    totalMoney:z.number(),
    totalEarnedPoint:z.number(),
    placeId: z.number()
})