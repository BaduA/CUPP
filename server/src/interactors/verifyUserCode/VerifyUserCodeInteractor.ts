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

  async create(email: string, userId: number) {
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
  async createForForgotPassword(email: string, userId: number) {
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
  async getUnique(code: string, userId: number) {
    var codeFromDB = await this.repository.findFirst({ id: code, userId });
    if (!codeFromDB)
      throw new BadRequestsException(
        "Code Not Found",
        ErrorCode.ENTITY_NOT_FOUND
      );
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
    return codeFromDB;
  }
  private generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
