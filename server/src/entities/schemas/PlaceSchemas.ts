import { z } from "zod";


export const CreatePlaceSchema = z.object({
    name: z.string(),
})
export const UpdatePlaceSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longtitude: z.number().optional(),
})
export const DeletePlaceImageSchema = z.object({
    imageId: z.number()
})
export const GetPlaceImagesSchema = z.object({
    placeId: z.number()
})
export const CreateMenuItemSchema = z.object({
    name: z.string(),
    price: z.string(),
    pointValue: z.string(),
    placeId: z.string()
})
export const UpdateMenuItemSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    price: z.string().optional(),
    pointValue: z.string().optional(),
})
export const DeleteMenuItemSchema = z.object({
    menuItemId: z.number()
})

export const AddWorkerSchema = z.object({
    userId: z.number(),
    placeId: z.number()
})

