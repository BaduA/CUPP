import { ICreatePlace, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IPlaceInteractor } from "./IPlaceInteractor";

export class PlaceInteractor implements IPlaceInteractor {
    private repository: IRepository;
    private imageService: IImageUploadService;
    constructor(repository: IRepository, imageService: IImageUploadService) {
        this.repository = repository;
        this.imageService = imageService;
    }
    async create(input: ICreatePlace) {
        return await this.repository.create({
            name: input.name,
            city: input.city,
            district: input.district,
            address: input.address,
            latitude: input.latitude,
            longtitude: input.longtitude,
            franchiseCompanyId: input.franchiseCompanyId
        })
    }
    async findByName(name: string) {
        return await this.repository.findMany({ where: { name: { startsWith: name } } })
    }
    async findWithId(id: number) {
        return await this.repository.findUnique({ id })
    }
    async findWithLocation(city: String, district: string) {
        return await this.repository.findMany({ where: { city, district } })
    }
    async updatePlace(input: IUpdatePlace) {
        var data: any = { ...input }
        delete data.id
        return await this.repository.update(input.id, data)
    }
    async deletePlace(id: number) {
        return await this.repository.delete(id)
    }
}