import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { CreateFranchiseCompany, ChangeFranchiseCompanyName, ChangeFranchiseCompanyPicture } from "../../entities/interfaces/FranchiseCompanyInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IFranchiseCompanyInteractor } from "./IFranchiseCompanyInteractor";

export class FranchiseCompanyInteractor implements IFranchiseCompanyInteractor {
    private repository: IRepository;
    private imageService: IImageUploadService;

    constructor(repository: IRepository, imageService: IImageUploadService) {
        this.repository = repository;
        this.imageService = imageService;
    }
    async getFranchiseCompanyByName(name: string) {
        return await this.repository.findMany({
            name: {
                startsWith: name
            }
        })
    }
    async deleteFranchiseCompany(id: number) {
        return await this.repository.delete({
            id
        })
    }
    async createFranchiseCompany(input: CreateFranchiseCompany) {
        if (await this.repository.findFirst({ name: input.name })) throw new BadRequestsException("Already have a franchise company with this name", ErrorCode.ENTITY_ALREADY_EXISTS)
        return await this.repository.create({
            name: input.name, brandPictureAddress:
                input.file == null ? null : await this.imageService.uploadSingleImage(input.file, "companies/" + input.name + "/brand/")
        })
    }
    async changeFranchiseCompanyName(input: ChangeFranchiseCompanyName) {
        if (await this.repository.findFirst({ name: input.name })) throw new BadRequestsException("Already have a franchise company with this name", ErrorCode.ENTITY_ALREADY_EXISTS)
        if (!await this.repository.findUnique({ id: input.id })) throw new BadRequestsException("Wrong Place ID. No place with this ID", ErrorCode.ENTITY_NOT_FOUND)
        return await this.repository.update(input.id, {
            name: input.name
        })
    }
    async changeFranchiseCompanyPicture(input: ChangeFranchiseCompanyPicture) {
        var company = await this.repository.findUnique({ id: input.id })
        if (!company) throw new BadRequestsException("Wrong Place ID. No place with this ID", ErrorCode.ENTITY_NOT_FOUND)
        var addressOfNew = await this.imageService.uploadSingleImage(input.file, "companies/" + company.name + "/brand/")
        this.imageService.delete(company.brandPictureAddress)
        return await this.repository.update(company.id, { brandPictureAddress: addressOfNew })
    }

}