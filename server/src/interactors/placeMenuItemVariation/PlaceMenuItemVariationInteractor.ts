import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { ICreatePlaceMenuItemVariation, IUpdatePlaceMenuItemVariation } from "../../entities/interfaces/PlaceMenuItemVariationInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IPlaceMenuItemVariationInteractor } from "./IPlaceMenuItemVariationInteractor";


export class PlaceMenuItemVariationInteractor implements IPlaceMenuItemVariationInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async createPlaceMenuItemVariation(input: ICreatePlaceMenuItemVariation) {
        if (await this.repository.findFirst({ menuItemId: input.menuItemId, size: input.size }))
            throw new BadRequestsException("Already have this size on this item", ErrorCode.ENTITY_ALREADY_EXISTS)
        return await this.repository.create({ size: input.size, isWithDiscount: input.isWithDiscount, price: input.price, pointValue: input.pointValue })

    }
    async deletePlaceMenuItemVariation(id: number) {
        if (!await this.repository.findUnique({ id }))
            throw new BadRequestsException("Variation Not Found", ErrorCode.ENTITY_NOT_FOUND)
        return await this.repository.delete(id)
    }
    async updatePlaceMenuItemVariation(input: IUpdatePlaceMenuItemVariation) {
        var variation = await this.repository.findUnique({ id: input.id })
        if (!variation)
            throw new BadRequestsException("Variation Not Found", ErrorCode.ENTITY_NOT_FOUND)
        if (await this.repository.findFirst({ menuItemId: variation.menuItemId, size: input.size }))
            throw new BadRequestsException("Already have this size on this item", ErrorCode.ENTITY_ALREADY_EXISTS)
        var data: any = { ...input }
        delete data.id
        return await this.repository.update(input.id, data)
    }

}