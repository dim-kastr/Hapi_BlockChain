import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Wallet } from "./Wallet"


@Table({
    timestamps: false,
    tableName: "Users"
})

export class User extends Model {
    @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => getUUID(), })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    addressOwner: string;

    @HasMany(() => Wallet)
    wallets: Wallet[];

    static createUser = async function (addressOwner: string) {
        return await this.create({
            addressOwner
        })
    }
}