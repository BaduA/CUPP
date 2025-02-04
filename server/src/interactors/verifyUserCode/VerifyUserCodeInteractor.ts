import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { ISendMailService } from "../../infrastructures/services/ISendMailService";
import { IVerifyUserCodeInteractor } from "./IVerifyUserCodeInteractor";

export class VerifyUserCodeInteractor implements IVerifyUserCodeInteractor {
  private repository: IRepository;
  private sendMailService: ISendMailService;

  constructor(repository: IRepository, sendMailService: ISendMailService) {
    this.repository = repository;
    this.sendMailService = sendMailService;
  }

  async createForEmailVertification(email: string, userId: string) {
    let id;
    while (true) {
      let code = this.generateCode();
      if (await this.repository.findUnique({ id: code.toString() })) {
        continue;
      } else {
        id = code;
        break;
      }
    }
    this.sendMailService.sendVerifyUserMail(email, id.toString());
    return await this.repository.create({ userId, id: id.toString() });
  }
  async createForForgotPassword(email: string, userId: string) {
    let id;
    while (true) {
      let code = this.generateCode();
      if (await this.repository.findUnique({ id: code.toString() })) {
        continue;
      } else {
        id = code;
        break;
      }
    }
    this.sendMailService.sendVerifyForgotPassword(email, id.toString());
    return await this.repository.create({ userId, id: id.toString() });
  }
  async delete(code: string) {
    var codeFromDB = await this.repository.findFirst({ id: code });
    if (!codeFromDB)
      throw new BadRequestsException(
        "Code Not Found",
        ErrorCode.ENTITY_NOT_FOUND
      );
    return await this.repository.delete(code);
  }
  async deleteExpiredOnes() {
    return await this.repository.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
  async getUnique(code: string, userId: string) {
    var codeFromDB = await this.repository.findFirst({ id: code, userId });
    if (!codeFromDB)
      throw new BadRequestsException(
        "Code Not Found",
        ErrorCode.ENTITY_NOT_FOUND
      );
    if (codeFromDB.expiresAt - Date.now() < 0) {
      throw new BadRequestsException(
        "Code Expired",
        ErrorCode.UNPROCESSIBLE_ENTITY
      );
    }

    return codeFromDB;
  }
  async getUniqueWithEmail(code: string, email: string) {
    var codeFromDB = await this.repository.findFirst({
      id: code,
      user: { email },
    });
    if (!codeFromDB)
      throw new BadRequestsException(
        "Code Not Found",
        ErrorCode.ENTITY_NOT_FOUND
      );
    if (codeFromDB.expiresAt - Date.now() < 0) {
      throw new BadRequestsException(
        "Code Expired",
        ErrorCode.UNPROCESSIBLE_ENTITY
      );
    }
    return codeFromDB;
  }
  private generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
