import { ContractAbi } from '../../abi/contractAbi';
import { User } from '../models/User';
import { Wallet } from '../models/Wallet';
import { BigNumber } from "bignumber.js";
import { Transaction } from '../models/Transactions';

const Web3 = require("web3");

export const createProvider = async () => {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/dd487bf43f634709939df4ba1f8d4635"
    );

    const WEB3 = new Web3(provider)

    return WEB3
}

export const createAccount = async () => {

    const web3 = await createProvider();

    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY_ACCOUNT);
    const access = web3.eth.accounts.wallet.add(account);

    return access
}

export const createContract = async () => {

    const web3 = await createProvider();
    const account = await createAccount();

    const myContract = new web3.eth.Contract(
        ContractAbi,
        process.env.CONTRACT_ADDRESS,
        { from: account.address }
    );

    return myContract
}

export const readingContractEventsDeposit = async () => {
    try {
        const contract = await createContract();
        const events = await contract.getPastEvents('Deposit', {
            fromBlock: 0,
            toBlock: 'latest',
        })

        for (let event of events) {
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
        }
    } catch (e) { console.log(e) }
}

export const readingContractEventsWithdraw = async () => {
    try {
        const contract = await createContract();
        const events = await contract.getPastEvents('Withdraw', {
            fromBlock: 0,
            toBlock: 'latest',
        })

        for (let event of events) {
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

            let balanceFullWallet = new BigNumber(wallet.amount);
            let amountEvent = new BigNumber(amountWallet);
            wallet.update({
                amount: +balanceFullWallet - +amountEvent
            })
        }
    } catch (e) { console.log(e) }
}

export const recordingAllEvents = async (type: string) => {
    try {
        const contract = await createContract();
        const events = await contract.getPastEvents(type, {
            fromBlock: 0,
            toBlock: 'latest',
        })

        for (let event of events) {
            const { account, amount, token, addressOwner, addressToken } = event.returnValues
            const amountWallet = Web3.utils.fromWei(amount, 'ether')
            await Transaction.createTransaction({
                idTransaction: event.id,
                addressOwner: (event.event === 'Deposit') ? addressOwner : account,
                amount: amountWallet,
                addressToken: (event.event === "Deposit") ? addressToken : token,
                event: event.event
            })
        }

    } catch (e) { console.log(e) }
}
