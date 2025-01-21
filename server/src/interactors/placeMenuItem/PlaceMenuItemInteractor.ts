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

    async createPlaceMenuItem(input: ICreatePlaceMenuItem) {
        if (await this.repository.findFirst({ name: input.name, size: input.size })) throw new BadRequestsException("Bu isim ve bu boyda bir ürün bulunmakta.", ErrorCode.ENTITY_ALREADY_EXISTS)
        return await this.repository.create({
            name: input.name,
            size: input.size,
            price: input.price,
            pointValue: input.pointValue,
            placeId: input.placeId,
            imageAddress: input.image == null ? null : await this.imageService.uploadSingleImage(input.image, "places/" + input.placeId + "/menuItems/")
        })
    }
    async updatePlaceMenuItem(input: IUpdatePlaceMenuItem) {
        var data: any = { ...input }
        delete data.id
        return await this.repository.update(input.id, data)
    }
    async deletePlaceMenuItem(id: number) {
        return await this.repository.delete(id)
    }
    async getPlaceMenuItemsByName(input: IGetMenuItemsByName) {
        return await this.repository.findMany({ placeId: input.id, name: { startsWith: input.name } })
    }
    async getAllMenuItems(id: number) {
        return await this.repository.findMany({ placeId: id })
    }

}