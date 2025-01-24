import { S3ImageService } from "../services/S3ImageService";
import { IRepository } from "./IRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

prismaClient.$use(async (params: any, next: any) => {
  const before = Date.now();
  let result = await next(params);
  // console.log(result)
  // if ("profilePictureAddress" in result) {
  //   result = { ...result, profilePictureAddress: await S3ImageService.get(result.profilePictureAddress) }
  // }
  // if ("imageAddress" in result) {
  //   result = { ...result, imageAddress: await S3ImageService.get(result.imageAddress) }
  // }
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );

  return result;
});
export class PrismaRepository implements IRepository {
  private entity: any;
  constructor(type: string) {
    if (type == "placeImage") this.entity = prismaClient.placeImage
    else if (type == "place") this.entity = prismaClient.place;
    else if (type == "user") this.entity = prismaClient.user;
    else if (type == "placeWorker") this.entity = prismaClient.placeWorker;
  }
  async deleteWithUniqueData(data: any) {
    return await this.entity!.delete({
      where: data,
    });
  }
  async findUnique(whereData: any, selectData: any = null) {
    return await this.entity!.findUnique({
      where: whereData,
      select: selectData,
    });
  }
  async findFirst(whereData: any, selectData: any = null) {
    return await this.entity!.findFirst({
      where: whereData,
      select: selectData,
    });
  }
  async findMany(whereData: any, selectData: any = null, skip: any = null, take: any = null) {
    return await this.entity!.findMany({
      where: whereData,
      select: selectData,
      skip,
      take
    });
  }
  async create(data: any, selectData: any = null) {
    return await this.entity!.create({
      data: data,
      select: selectData,
    });
  }
  async delete(id: any) {
    return await this.entity!.delete({
      where: { id },
    });
  }
  async update(id: number, data: any, selectData: any = null) {
    return await this.entity!.update({
      where: { id },
      data: data,
      select: selectData,
    });
  }
}

export const userRepository = new PrismaRepository("user")
export const placeRepository = new PrismaRepository("place")
export const placeWorkerRepository = new PrismaRepository("placeWorker")