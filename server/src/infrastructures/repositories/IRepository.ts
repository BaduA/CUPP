export interface IRepository {
    findUnique(whereData: any, selectData?: any, includeData?: any): any;
    findFirst(whereData: any, selectData?: any, includeData?: any): any;
    findMany(whereData: any, selectData?: any, includeData?: any): any;
    create(data: any, selectData?: any, includeData?: any): any;
    delete(id: any): any;
    update(id: number, data: any, selectData?: any, includeData?: any): any;
}
