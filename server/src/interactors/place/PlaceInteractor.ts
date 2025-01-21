import { ICreatePlace, IFindClosestPlace, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";
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
    async findClosest(input: IFindClosestPlace) {
        var placesInCity = await this.repository.findMany({ city: input.city })
        var placesInCityWithDistance = [...placesInCity]
        var pageNumber = Math.floor(placesInCity.length / 5)
        var page = Math.min(pageNumber, input.page);
        for (var i = 0; i < placesInCity.length; i++) {
          var lat1 = input.latitude
          var lat2 = placesInCity[i].latitude
          var lon1 = input.longtitude
          var lon2 = placesInCity[i].longtitude
          placesInCityWithDistance[i].distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * 6371
        }
        placesInCityWithDistance.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
        placesInCityWithDistance = placesInCityWithDistance.slice((page - 1) * 5, page * 5)
        return placesInCityWithDistance
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