import { ModelAttributes } from "sequelize";
import { DataType, Model } from "sequelize-typescript";
import { ECategory, INFT } from "../types/NFT.t.js";

export const nftModel: ModelAttributes<Model, INFT> = {
    id: {
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        unique: true,
    },
    contractAddress: {
        type: DataType.STRING,
        defaultValue: "fake-contract ## mocks data",
        allowNull: false,
    },
    tokenId: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
    },
    ownerId: {
        type: DataType.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    collection: {
        type: DataType.STRING,
        allowNull: false,
    },
    category: {
        type: DataType.ENUM(...Object.values(ECategory)),
        allowNull: false,
        validate: {
            isIn: {
                args: [Object.values(ECategory)],
                msg: `Invalid category value, allowable: ${Object.values(ECategory)}`
            }
        }
    },
    image: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    description: {
        type: DataType.STRING,
        allowNull: true,
    },
    chainId: {
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    royaltyPercentage: {
        type: DataType.FLOAT,
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    }
}