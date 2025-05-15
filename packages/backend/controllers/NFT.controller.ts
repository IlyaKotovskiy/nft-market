import "../utils/getEnv.js";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../config/aws.js";
import { NFT, User } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";

export const getNfts = asyncHandler(async (_, res) => {
    const nfts = await NFT.findAll();
    return res.status(200).json(nfts);
});

export const createNft = asyncHandler(async (req, res) => {
    const { ownerId, name, collection, category, description, royaltyPercentage } = req.body;
    const file = req.file;

    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    // Провекра на обязательные поля
    if (!name || !ownerId || !collection || !category || !file) {
        return res.status(400).json({
            error: "name, ownerId, collection, category and file are required!"
        });
    };

    // Проверка юзера
    const user = await User.findByPk(ownerId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    };

    if (!file.originalname) {
        return res.status(400).json({
            error: "Uploaded file is missing original name."
        });
    }

    // Экранизация имен файлов
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeFileName = baseName
        .toLowerCase()
        .replace(/[^a-z0-9_-]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    const fileKey = `uploads/${Date.now()}_${safeFileName}${ext}`;

    // Запись в бд с ссылкой на медиа
    const createdNft = await NFT.create({
        name,
        category,
        collection,
        image: `${process.env.PUBLIC_STORAGE_URL}/${fileKey}`,
        description,
        royaltyPercentage,
        ownerId
    });

    // Загрузка медиа в S3
    const uploadToS3 = new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        },
    });
    const s3Response = await uploadToS3.done();

    return res.status(200).json({ message: "Created NFT!", createdNft });
});

export const deleteNft = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "id field required!" })
    }

    const deletedNft = await NFT.destroy({ where: { id } });

    if (deletedNft === 0) {
        return res.status(404).json({ error: "NFT not found!" });
    }

    return res.status(200).json({ message: "NFT deleted successfully!" })
});