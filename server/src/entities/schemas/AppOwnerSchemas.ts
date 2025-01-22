import { z } from "zod";


export const CreatePlaceSchema = z.object({
    name: z.string(),
    workerAdminId: z.number()
})
