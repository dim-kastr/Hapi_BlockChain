import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { User } from './User';


interface IUserType {
    userId: string,
    addressToken: string,
    amount: bigint
}

@Table({
    timestamps: false,
    tableName: "Wallets"
})

export class Wallet extends Model {
    @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @Column({ type: DataType.STRING, allowNull: false })
    addressToken: string;

    @Column({ type: DataType.STRING, allowNull: false })
    amount: string;

    @BelongsTo(() => User)
    user: User;

    static createWallet = async function (address: IUserType) {
        await this.create(address)
    }
}