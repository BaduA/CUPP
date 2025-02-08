export interface IRepository {
    findUnique(whereData: any, selectData?: any, includeData?: any): any;
    findFirst(whereData: any, selectData?: any, includeData?: any): any;
    findMany(whereData: any, selectData?: any, includeData?: any): any;
    create(data: any, selectData?: any, includeData?: any): any;
    delete(id: any): any;
    deleteMany(whereData:any): any;
    deleteWithUniqueData(data: any):any;
    update(id: number | string, data: any, selectData?: any, includeData?: any): any;
    count():any
}
