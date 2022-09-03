import { IAction } from 'src/redux/types';
import AUTH_TYPES from './types';

const initialState = {
    walletData: {}
};

const drawlReducer = (
    state = initialState,
    action: IAction<string | boolean>
) => {
    switch (action.type) {
        case AUTH_TYPES.GET_WALLET_DATA:
            return {
                ...state,
                walletData: action?.data,
            };
        default:
            return state;
    }
};

export default drawlReducer;
