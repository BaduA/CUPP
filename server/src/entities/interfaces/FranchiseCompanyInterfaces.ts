export interface CreateFranchiseCompany {
    file?: Express.Multer.File;
    name: string;
}
export interface ChangeFranchiseCompanyName {
    id:number;
    name: string;
}
export interface ChangeFranchiseCompanyPicture {
    id:number;
    file: Express.Multer.File;
}