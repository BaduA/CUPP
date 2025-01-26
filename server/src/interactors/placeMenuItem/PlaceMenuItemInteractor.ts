import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { ICreatePlaceMenuItem, IUpdatePlaceMenuItem, IGetMenuItemsByName } from "../../entities/interfaces/PlaceMenuItemInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IPlaceImageInteractor } from "../placeImage/IPlaceImageInteractor";
import { IPlaceMenuItemInteractor } from "./IPlaceMenuItemInteractor";

export class PlaceMenuItemInteractor implements IPlaceMenuItemInteractor {
    private repository: IRepository;
    private imageService: IImageUploadService;
    constructor(repository: IRepository, imageService: IImageUploadService) {
        this.repository = repository;
        this.imageService = imageService;
    }
    async getMenuItemById(id: number) {
        return await this.repository.findUnique({ id }, null, { variations: true })
    }
    async getMenuItemWithDiscounts(id: number) {
        return await this.repository.findUnique({ id }, null, { variations: { where: { isWithDiscount: true } } })
    }
    async getMenuItemWithoutDiscounts(id: number) {
        return await this.repository.findUnique({ id }, null, { variations: { where: { isWithDiscount: false } } })
    }
    async createPlaceMenuItem(input: ICreatePlaceMenuItem) {
        if (await this.repository.findFirst({ name: input.name })) throw new BadRequestsException("Bu isimde bir ürün bulunmakta.", ErrorCode.ENTITY_ALREADY_EXISTS)
        return await this.repository.create({
            name: input.name,
            place: input.place,
            imageAddress: input.image == null ? null : await this.imageService.uploadSingleImage(input.image, "places/" + input.place.connect.id + "/menuItems/")
        })
    }
    async updatePlaceMenuItem(input: IUpdatePlaceMenuItem) {
        var data: any = { ...input }
        delete data.id
        if (input.image) {
            var menuItem = await this.repository.findUnique({ id: input.id })
            if (menuItem.imageAddress) this.imageService.delete(menuItem.imageAddress)
            return await this.repository.update(input.id, { imageAddress: await this.imageService.uploadSingleImage(input.image, "places/" + menuItem.placeId + "/menuItems/") })
        }
        return await this.repository.update(input.id, data)
    }
    async deletePlaceMenuItem(id: number) {
        var menuItem = await this.repository.findUnique({ id })
        if (!menuItem) throw new BadRequestsException("Menu Item Not Found", ErrorCode.ENTITY_NOT_FOUND)
        if (menuItem.imageAddress) {
            this.imageService.delete(menuItem.imageAddress)
        }
        return await this.repository.delete(id)
    }
    async getPlaceMenuItemsByName(input: IGetMenuItemsByName) {
        return await this.repository.findMany({ placeId: input.id, name: { startsWith: input.name, mode: "insensitive" } })
    }
    async getAllMenuItems(id: number) {
        return await this.repository.findMany({ placeId: id })
    }

}