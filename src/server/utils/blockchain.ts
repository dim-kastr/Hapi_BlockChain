import { ContractAbi } from '../../abi/contractAbi';
import { handlerDeposit, handlerWithdraw } from '../utils/events'

const Web3 = require("web3");

export const createProvider = async () => {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/dd487bf43f634709939df4ba1f8d4635"
    );

    const web3 = new Web3(provider)

    return web3
}

export const createAccount = async () => {

    const web3 = await createProvider();

    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY_ACCOUNT);
    const access = web3.eth.accounts.wallet.add(account);

    return access
}

export const createContractAbi = async () => {

    const web3 = await createProvider();
    const account = await createAccount();

    const abiContract = new web3.eth.Contract(
        ContractAbi,
        process.env.CONTRACT_ADDRESS,
        { from: account.address }
    );

    return abiContract
}

export const readingContractEvents = async () => {
    try {
        const contract = await createContractAbi();
        const events = await contract.getPastEvents('Deposit', {
            fromBlock: 0,
            toBlock: 'latest',
        })

        for (let event of events) {

            if (event.event === "Deposit") {
                await handlerDeposit(event)
            }

            if (event.event === "Withdraw") {
                await handlerWithdraw(event)
            }

        }
    } catch (e) { console.log(e) }
}