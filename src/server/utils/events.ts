import { User } from '../models/User';
import { Wallet } from '../models/Wallet';
import { BigNumber } from "bignumber.js";
import { Transaction } from '../models/Transactions';

const Web3 = require("web3");


export const handlerDeposit = async (event) => {
    const { addressOwner, amount, addressToken } = event.returnValues
    const amountWallet = Web3.utils.fromWei(amount, 'ether')

    let user = await User.findOne({
        where: {
            addressOwner
        },
        include: {
            model: Wallet,
            as: "wallets",
            where: {
                addressToken
            },
            required: false
        }
    })

    if (!user) {
        user = await User.createUser(addressOwner);
    }

    if (!user.wallets || !user.wallets.length) {
        await Wallet.createWallet({
            userId: user.id,
            amount: amountWallet,
            addressToken
        })
    } else {
        let balanceFullWallet = new BigNumber(user.wallets[0].amount);
        let amountEvent = new BigNumber(amountWallet);
        await user.wallets[0].update({
            amount: +balanceFullWallet + +amountEvent
        })
    }

    await Transaction.createTransaction({
        idTransaction: event.id,
        addressOwner,
        amount: amountWallet,
        addressToken,
        event: event.event
    })
}


export const handlerWithdraw = async (event) => {
    const { account, amount, token } = event.returnValues
    const amountWallet = Web3.utils.fromWei(amount, 'ether')

    const user = await User.findOne({
        where: {
            addressOwner: account
        }
    })

    const wallet = await Wallet.findOne({
        where: {
            userId: user.id,
            addressToken: token
        }
    })

    if (wallet) {
        let balanceFullWallet = new BigNumber(wallet.amount);
        let amountEvent = new BigNumber(amountWallet);
        wallet.update({
            amount: +balanceFullWallet - +amountEvent
        })
    }

    await Transaction.createTransaction({
        idTransaction: event.id,
        addressOwner: account,
        amount: amountWallet,
        addressToken: token,
        event: event.event
    })
}