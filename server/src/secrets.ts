import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY!;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!;
export const S3_REGION = process.env.S3_REGION!;
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY!;
