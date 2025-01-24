import { BadRequestsException } from "../entities/exceptions/bad-request";
import { ErrorCode } from "../entities/exceptions/root";
import { IPlaceWorkerInteractor } from "../interactors/placeWorker/IPlaceWorkerInteractor";

export abstract class Validator {
    placeWorkerInteractor: IPlaceWorkerInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor) {
        this.placeWorkerInteractor = placeWorkerInteractor
    }
    async placeAdminValidator(placeId: number, userId: number) {
        var worker = await this.placeWorkerInteractor.getWithId(placeId, userId)
        if (!worker) throw new BadRequestsException("Bu kullanıcı mekanın çalışanı değil.", ErrorCode.UNAUTHORIZED)
        if (worker.role != "ADMIN") throw new BadRequestsException("Bu kullanıcı mekanın admini değil.", ErrorCode.UNAUTHORIZED)
    }
    async placeWorkerValidator(placeId: number, userId: number) {
        var worker = await this.placeWorkerInteractor.getWithId(placeId, userId)
        if (!worker) throw new BadRequestsException("Bu kullanıcı mekanın çalışanı değil.", ErrorCode.UNAUTHORIZED)
        if (worker.role != "WAITER") throw new BadRequestsException("Bu kullanıcı mekanın garsonu değil.", ErrorCode.UNAUTHORIZED)
    }
}