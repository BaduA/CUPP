
export interface ICreatePlace {
    name: String
    city: String
    district: String
    address: String
    latitude: number
    longtitude: number
    franchiseCompanyId?: number
    images?: Express.Multer.File[];
}
export interface IUpdatePlace {
    id: number
    name?: string;
    city?: string;
    district?: string;
    address?: string;
    latitude?: number;
    longtitude?: number;
}

