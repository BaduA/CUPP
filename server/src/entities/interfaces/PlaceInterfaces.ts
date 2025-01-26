
export interface ICreateFranchisePlace {
    name: String
    city: String
    district: String
    address: String
    latitude: number
    longtitude: number
    franchiseCompanyId?: number
}
export interface ICreatePlace {
    name: String
    appFeedingRate : number
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

export interface IFindClosestPlace {
    latitude: number
    longtitude: number
    city: string
    page: number
  }