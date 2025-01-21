import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { ICreatePlaceImage, ICreatePlaceImages } from "../../entities/interfaces/PlaceImageInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IPlaceImageInteractor } from "./IPlaceImageInteractor";

export class PlaceImageInteractor implements IPlaceImageInteractor {
  private repository: IRepository;
  private imageService: IImageUploadService;
  constructor(repository: IRepository, imageService: IImageUploadService) {
    this.repository = repository;
    this.imageService = imageService;
  }
  async uploadImages(input: ICreatePlaceImages) {
    var fileNames = await this.imageService.uploadManyImages(input.files, "places/" + input.placeId + "/images/");
    for (let i = 0; i < fileNames!.length; i++) {
      await this.repository.create({
        imageAddress: fileNames![i],
        placeId: input.placeId
      });
    }
    return true;
  }
  async uploadImage(input: ICreatePlaceImage) {
    var fileName = await this.imageService.uploadSingleImage(input.file, "places/" + input.placeId + "/images/");
    return await this.repository.create({
      imageAddress: fileName,
      placeId: input.placeId
    });;
  }
  async getImages(placeId: number) {
    var images = await this.repository.findMany({ placeId })
    for (var i = 0; i < images.length; i++) {
      images[i].imageAddress = await this.imageService.get(images[i].imageAddress)
    }
    return images
  }
  async deleteImage(id: number) {
    var image = await this.repository.findUnique({id})
    if(!image) throw new BadRequestsException("Wrong Image ID",ErrorCode.ENTITY_NOT_FOUND)
    this.imageService.delete(image.imageAddress)
    await this.repository.delete(id)
    return true
  }


}
