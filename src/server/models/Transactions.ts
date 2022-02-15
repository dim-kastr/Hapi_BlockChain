import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ITransactionType {
    idTransaction: string,
    addressOwner: string,
    amount: string,
    addressToken: string,
    event: string
}


@Table({
    timestamps: false,
    tableName: "Transactions"
})

export class Transaction extends Model {
    @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
    idTransaction: string;

    @Column({ type: DataType.STRING, allowNull: false })
    addressOwner: string;

    @Column({ type: DataType.STRING, allowNull: false })
    amount: string;

    @Column({ type: DataType.STRING, allowNull: false })
    addressToken: string;

    @Column({ type: DataType.STRING, allowNull: false })
    event: string;

    static createTransaction = async function (transaction: ITransactionType) {
        await this.create(transaction)
    }
}