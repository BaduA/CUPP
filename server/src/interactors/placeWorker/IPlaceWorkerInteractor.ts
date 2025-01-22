import { ICreatePlaceWorker } from "../../entities/interfaces/PlaceWorkerInterface";

export interface IPlaceWorkerInteractor {
    addAdminToPlace(input: ICreatePlaceWorker): any
    addWaiterToPlace(input: ICreatePlaceWorker): any
    deleteWorkerFromPlace(workerId: number, placeId:number): any
    getWaiters(placeId: number): any
    getAdmins(placeId: number): any
    getWithId(placeId: number, userId: number): any
    getAll(placeId: number): any
}