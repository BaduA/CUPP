import { DeleteObjectCommand, DeleteObjectCommandOutput, GetObjectCommand, PutObjectCommand, PutObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { S3_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION, S3_SECRET_KEY } from "../../secrets";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import path from "path";
import { IImageUploadService } from "./IImageUploadService";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";

export class S3ImageService implements IImageUploadService {
    get(key: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    private static bucketName = S3_BUCKET_NAME;
    private static region = S3_REGION;
    private static accessKeyId = S3_ACCESS_KEY;
    private static secretAccessKey = S3_SECRET_KEY;
    private static s3Client = new S3Client({
        region: this.region,
        credentials: {
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        },
    });


    async uploadSinglePdf(file: Express.Multer.File, rootFolderName: string): Promise<string> {
        const address = rootFolderName + this.generateFileName() + path.extname(file.originalname).toLowerCase()
        const convertedfile: any = file.buffer;
        const uploadParams = {
            Bucket: S3ImageService.bucketName,
            Body: Buffer.from(convertedfile.data, 'binary'),
            Key: address,
            ContentType: file.mimetype,
        };

        try {
            S3ImageService.s3Client.send(new PutObjectCommand(uploadParams));
            return address;
        } catch (err: any) {
            throw err;
        }
    }
    async uploadSingleImage(file: any, rootFolderName: string): Promise<string> {
        if (!this.cheackForImage(file)) throw new BadRequestsException("Unsupported file extension for image", ErrorCode.UNSUPPORTED_FILE_TYPE)
        const address = rootFolderName + this.generateFileName() + path.extname(file.originalname).toLowerCase()
        const fileBuffer = await sharp(Buffer.from(file.buffer, 'binary'))
            .resize({ height: 1920, width: 1080, fit: "contain" })
            .toBuffer();
        const uploadParams = {
            Bucket: S3ImageService.bucketName,
            Body: fileBuffer,
            Key: address,
            ContentType: file.mimetype,
        };
        S3ImageService.s3Client.send(new PutObjectCommand(uploadParams))
        return address;
    }
    async uploadManyImages(photos: Express.Multer.File[], rootFolderName: string): Promise<string[] | void> {

        var addresses: string[] = [];
        for (let i = 0; i < photos.length; i++) {
            var val = (await this.uploadSingleImage(photos[i], rootFolderName))
            addresses.push(val)
        }
        return addresses;
    }

    delete(fileName: string): boolean {
        const deleteParams = {
            Bucket: S3ImageService.bucketName,
            Key: fileName,
        };

        try {
            S3ImageService.s3Client.send(new DeleteObjectCommand(deleteParams))
            return true;
        } catch (err) {
            throw err;
        }
    }
    static async get(key: string): Promise<string> {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        };
        // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
        const command = new GetObjectCommand(params);
        const seconds = 36000;
        const url = await getSignedUrl(S3ImageService.s3Client, command, { expiresIn: seconds });
        return url;
    }
    private generateFileName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");


    public cheackForImage(file: any): boolean {
        const filetypes = /jpeg|jpg|png/;

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return true;
        } else {
            return false;
        }
    }


}