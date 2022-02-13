import {
    callApprove,
    callDeposit,
    callWithdraw,
    getInfoToken,
    getListTokens
} from '../../api/v1/events';
import * as valid from "../../schemes/index"


export default [
    {
        method: 'POST',
        path: '/v1/contract/approve',
        handler: callApprove,
        options: {
            validate: {
                payload: valid.validMethod
            }
        }
    },
    {
        method: 'POST',
        path: '/v1/contract/deposit',
        handler: callDeposit,
        options: {
            validate: {
                payload: valid.validMethod
            }
        }
    },
    {
        method: 'POST',
        path: '/v1/contract/withdraw',
        handler: callWithdraw,
        options: {
            validate: {
                payload: valid.validMethod
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/tokens/list/all',
        handler: getListTokens,
    },
    {
        method: 'GET',
        path: '/v1/tokens/info/{token}',
        handler: getInfoToken,
    },
];