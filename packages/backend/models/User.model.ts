import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize'
import { EUserRole, IUser } from '../types/User.t.js'

export const userModel: ModelAttributes<Model, IUser> = {
    id: {
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        unique: true,
    },
    role: {
        type: DataType.ENUM(EUserRole.USER, EUserRole.ADMIN),
        defaultValue: EUserRole.USER,
        allowNull: false
    },
    wallet_address: {
        type: DataType.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: DataType.STRING,
        allowNull: true,
    },
    email: {
        type: DataType.STRING,
        allowNull: true
    }
}