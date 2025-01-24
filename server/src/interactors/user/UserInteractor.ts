import { compareSync, hashSync } from "bcrypt";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IChangePassword, IChangeProfilePicture, ISignIn, ISignUp, IUpdateUser, IUserPoint } from "../../entities/interfaces/UserInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IUserInteractor } from "./IUserInteractor";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";

export class UserInteractor implements IUserInteractor {
    private repository: IRepository;
    private imageService: IImageUploadService;
    constructor(repository: IRepository, imageService: IImageUploadService) {
        this.repository = repository;
        this.imageService = imageService;
    }
    async increaseUserPoint(input: IUserPoint) {
        var user = await this.repository.findUnique({ id: input.userId })
        if (user == null) throw new BadRequestsException("User not found.", ErrorCode.ENTITY_NOT_FOUND)
        return await this.repository.update(input.userId, { totalPoints: user.totalPoints + input.point })
    }
    async decreaseUserPoint(input: IUserPoint) {
        var user = await this.repository.findUnique({ id: input.userId })
        if (user == null) throw new BadRequestsException("User not found.", ErrorCode.ENTITY_NOT_FOUND)
        if (user.totalPoints < input.point) throw new BadRequestsException("Not enough points.", ErrorCode.INSUFFICIENT)
        return await this.repository.update(input.userId, { totalPoints: user.totalPoints - input.point })
    }
    async signUp(input: ISignUp) {
        var user = await this.repository.findFirst({
            OR: [
                {
                    email: input.email
                },
                {
                    phoneNumber: input.phoneNumber
                }, {
                    username: input.username
                }
            ]
        })
        console.log(input)
        if (user) throw new BadRequestsException("User with this email or phone number already exists.", ErrorCode.ENTITY_ALREADY_EXISTS)
        return await this.repository.create({
            name: input.name,
            lastname: input.lastname,
            username: input.username,
            email: input.email,
            password: hashSync(input.password, 10),
            phoneNumber: input.phoneNumber,
            profilePictureAddress: input.profilePicture == null ? null : await this.imageService.uploadSingleImage(input.profilePicture, "users/" + input.username + "/profilePicture/")
        })
    }
    async signIn(input: ISignIn) {
        console.log(input)
        let user = await this.repository.findFirst({
            OR: [{ email: input.email?.toLowerCase() }, { username: input.username }],
        });
        console.log("ZZZ")
        if (!user)
            throw new BadRequestsException(
                "Bu email veya username kayıtlı değil",
                ErrorCode.USER_NOT_FOUND
            );
        if (!compareSync(input.password, user.password))
            throw new BadRequestsException(
                "Yanlış parola",
                ErrorCode.INCORRECT_PASSWORD
            );
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return token

    }
    async findWithId(id: number) {
        return await this.repository.findUnique({ id })
    }
    async updateUser(input: IUpdateUser) {
        var data: any = { ...input }
        delete data.id
        if (await this.repository.findUnique({ id: input.id }) == null) throw new BadRequestsException("User with id not found", ErrorCode.USER_NOT_FOUND)
        return await this.repository.update(input.id, data)
    }
    async changeProfilePicture(input: IChangeProfilePicture) {
        var user = await this.repository.findUnique({ id: input.id })
        if (user == null) throw new BadRequestsException("User with id not found", ErrorCode.USER_NOT_FOUND)
        var oldAddress = user.profilePictureAddress;
        var newAddres = await this.imageService.uploadSingleImage(input.profilePicture, "users/" + user.username + "/profilePicture/")
        this.imageService.delete(oldAddress)
        return await this.repository.update(input.id, { profilePictureAddress: newAddres })
    }
    async changePassword(input: IChangePassword) {
        var user = await this.repository.findUnique({ id: input.id })
        if (user == null) throw new BadRequestsException("User with id not found", ErrorCode.USER_NOT_FOUND)
        console.log(input.lastPassword, user.password)
        if (!compareSync(input.lastPassword, user.password))
            throw new BadRequestsException(
                "Old password does not match.",
                ErrorCode.INCORRECT_PASSWORD
            );
        return await this.repository.update(input.id, { password: hashSync(input.newPassword, 10) })

    }
    async deleteUser(id: number) {
        return await this.repository.delete(id)
    }
}