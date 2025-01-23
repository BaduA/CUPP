import { z } from "zod";


export const CreatePromotionSchema = z.object({
    name: z.string(),
    pointValue: z.string(),
})
