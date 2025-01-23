import { IPlaceInteractor } from "../../../interactors/place/IPlaceInteractor";
import { IPlaceImageInteractor } from "../../../interactors/placeImage/IPlaceImageInteractor";

export class PlaceController {
    private placeInteractor: IPlaceInteractor;
    private placeImageInteractor: IPlaceImageInteractor;
    constructor(placeInteractor: IPlaceInteractor, placeImageInteractor: IPlaceImageInteractor) {
        this.placeInteractor = placeInteractor;
        this.placeImageInteractor = placeImageInteractor;
    }
}