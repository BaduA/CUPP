import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { ICreateFranchisePlace, ICreatePlace, IFindClosestPlace, IPointTransaction, IUpdatePlace } from "../../entities/interfaces/PlaceInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IPlaceInteractor } from "./IPlaceInteractor";

export class PlaceInteractor implements IPlaceInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async createPlace(input: ICreatePlace) {
        return await this.repository.create({
            name: input.name,
            appFeedingRate: input.appFeedingRate
        })
    }
    async createWithFranchisePlace(input: ICreateFranchisePlace) {
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
        return await this.repository.findMany({ name: { startsWith: name, mode: "insensitive" } })
    }
    async findWithId(id: number, includeData?: any) {
        return await this.repository.findUnique({ id }, null, includeData)
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
    async addGivenPoints(input: IPointTransaction) {
        var place = await this.repository.findUnique({ id: input.id })
        if (!place) throw new BadRequestsException("Place Not Found", ErrorCode.ENTITY_NOT_FOUND)
        var data: any = { ...input }
        delete data.id
        return await this.repository.update(input.id, { totalGivenPoints: place.totalGivenPoints + input.points })
    }
    async addPromotionPoints(input: IPointTransaction) {
        var place = await this.repository.findUnique({ id: input.id })
        if (!place) throw new BadRequestsException("Place Not Found", ErrorCode.ENTITY_NOT_FOUND)
        var data: any = { ...input }
        delete data.id
        return await this.repository.update(input.id, { totalUsedPromotionPoints: place.totalUsedPromotionPoints + input.points })
    }
    async checkIsComplete(placeId: number) {
        var place = await this.repository.findUnique({ id: placeId }, null, { placeImages: true })
        var ifHasNull = place.name == null || place.address == null || place.city == null || place.city == null || place.district == null || place.latitude == null || place.longtitude == null || place.placeImages.length == 0
        if (ifHasNull && place.isComplete == true)
            place = await this.repository.update(place.id, { isComplete: false })
        else if (!ifHasNull && place.isComplete == false)
            place = await this.repository.update(place.id, { isComplete: true })
        return place;
    }
    async deletePlace(id: number) {
        var place = await this.repository.findUnique({ id })
        return await this.repository.delete(id)
    }
    async getTotalPlaceNumber(){
        return await this.repository.count()
    }
}