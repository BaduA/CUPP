import { z } from "zod";

const orderMenuItemSchema = z.object({
    menuItemId:z.number(),
    amount:z.number()
})
export const ProcessUserOrderSchema = z.object({
    userId:z.number(),
    menuItems: z.array(orderMenuItemSchema)
})