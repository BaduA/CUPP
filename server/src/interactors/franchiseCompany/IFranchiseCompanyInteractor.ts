import { ChangeFranchiseCompanyName, ChangeFranchiseCompanyPicture, CreateFranchiseCompany } from "../../entities/interfaces/FranchiseCompanyInterfaces";

export interface IFranchiseCompanyInteractor{
    createFranchiseCompany(input: CreateFranchiseCompany):any
    changeFranchiseCompanyName(input: ChangeFranchiseCompanyName):any
    changeFranchiseCompanyPicture(input: ChangeFranchiseCompanyPicture):any
    getFranchiseCompanyByName(name:string):any
    deleteFranchiseCompany(id:number):any
}