import { z } from "zod";


export const CreatePlaceSchema = z.object({
    name: z.string(),
    appFeedingRate: z.number(),
    workerAdminId: z.number()
})
