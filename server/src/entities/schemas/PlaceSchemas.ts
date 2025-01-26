import { z } from "zod";


export const CreatePlaceSchema = z.object({
    name: z.string(),
})
export const UpdatePlaceSchema = z.object({
    name: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    district: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    latitude: z.number().optional().nullable(),
    longtitude: z.number().optional().nullable(),
})
export const GetPlacesByArea = z.object({
    city:z.string(),
    district: z.string().optional()
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
export const GetMenuItemsByNameSchema = z.object({
    name: z.string()
})

export const AddWorkerSchema = z.object({
    userId: z.number(),
    placeId: z.number()
})

export const CreatePromotionSchema = z.object({
    pointValue: z.number(),
    name: z.string()

})

