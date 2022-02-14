import { Request } from "@hapi/hapi";
import { ContractAbi } from '../../../abi/contractAbi';
import { ContractERC20 } from '../../../abi/contractERC20';
import { createProvider } from '../../utils/blockchain';
import { output } from '../../utils/index';


export const callApprove = async (request: Request) => {
    try {
        const { tokenAddress, amount, userPrivateKey } = request.payload;

        const web3 = await createProvider();

        const account = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
        web3.eth.accounts.wallet.add(account);

        const erc20Contract = new web3.eth.Contract(
            ContractERC20,
            tokenAddress,
            { from: account.address }
        );

        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await erc20Contract.methods.approve(
            process.env.CONTRACT_ADDRESS,
            amount
        ).estimateGas({
            from: account.address,
        });

        const approve = await erc20Contract.methods.approve(
            process.env.CONTRACT_ADDRESS,
            amount
        ).send({
            from: account.address,
            gasPrice,
            gas: gasEstimate,
        });

        return output({ approve })
    } catch (e) { console.log(e) }

};

export const callDeposit = async (request: Request) => {
    try {
        const { tokenAddress, amount, userPrivateKey } = request.payload;

        const web3 = await createProvider();

        const account = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
        web3.eth.accounts.wallet.add(account);

        const abiContract = new web3.eth.Contract(
            ContractAbi,
            process.env.CONTRACT_ADDRESS,
            { from: account.address }
        );

        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await abiContract.methods.deposit(
            amount,
            tokenAddress
        ).estimateGas({
            from: account.address,
        });

        const deposit = await abiContract.methods.deposit(
            amount,
            tokenAddress
        ).send({
            from: account.address,
            gasPrice,
            gas: gasEstimate,
        });

        return output({ deposit })
    } catch (e) { console.log(e) }
};

export const callWithdraw = async (request: Request) => {
    try {
        const { tokenAddress, amount, userPrivateKey } = request.payload;
        const web3 = await createProvider();

        const account = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
        web3.eth.accounts.wallet.add(account);

        const abiContract = new web3.eth.Contract(
            ContractAbi,
            process.env.CONTRACT_ADDRESS,
            { from: account.address }
        );

        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await abiContract.methods.withdraw(
            amount,
            tokenAddress
        ).estimateGas({
            from: account.address,
        });

        const withdraw = await abiContract.methods.withdraw(
            amount,
            tokenAddress
        ).send({
            from: account.address,
            gasPrice,
            gas: gasEstimate,
        });

        return output({ withdraw })
    } catch (e) { console.log(e) }
}

export const getListTokens = async () => {
    try {
        const web3 = await createProvider();

        const abiContract = new web3.eth.Contract(
            ContractAbi,
            process.env.CONTRACT_ADDRESS
        );

        const listTokens = await abiContract.methods.getListTokens().call()

        return output({ listTokens })
    } catch (e) { console.log(e) }
}

export const getInfoToken = async (request: Request) => {
    try {
        const token = request.params.token
        const web3 = await createProvider();

        const erc20Contract = new web3.eth.Contract(
            ContractERC20,
            token
        );

        const infoTokensDecimals = await erc20Contract.methods.decimals().call()
        const infoTokensName = await erc20Contract.methods.name().call()
        const infoTokensSymbol = await erc20Contract.methods.symbol().call()

        return output({
            infoTokensName,
            infoTokensSymbol,
            infoTokensDecimals
        })
    } catch (e) { console.log(e) }
}