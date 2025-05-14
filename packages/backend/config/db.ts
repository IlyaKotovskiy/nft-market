import '../utils/getEnv.js';
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { userModel } from "../models/User.model.js";
import { nftModel } from '../models/NFT.model.js';

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions);
const createdUpdatedOptions = { createdAt: true, updatedAt: true };

export const User = sequelize.define("user", userModel, createdUpdatedOptions);
export const NFT = sequelize.define("nft", nftModel, createdUpdatedOptions);

// Определение связей
User.hasMany(NFT, { foreignKey: 'ownerId', as: 'nfts' });
NFT.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`  ➜ 🎸 Connection to the "${sequelize.config.database}" database has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}