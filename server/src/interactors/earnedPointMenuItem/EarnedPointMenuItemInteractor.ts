import { ICreateEarnedPointMenuItem } from "../../entities/interfaces/EarnedPointMenuItem";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IEarnedPointMenuItemInteractor } from "./IEarnedPointMenuItemInteractor";

export class EarnedPointMenuItemInteractor implements IEarnedPointMenuItemInteractor {
    private repository: IRepository;

    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async createEarnedPointMenuItem(input: ICreateEarnedPointMenuItem) {
        return await this.repository.create({ placeMenuItemVariationId: input.menuItemVariationId, earnedPlacePointId: input.earnedPlacePointId, amount: input.amount })
    }
}