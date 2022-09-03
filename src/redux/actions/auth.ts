import { ethers } from "ethers";
import API from 'src/api';
import types from "src/redux/reducers/auth/types";

const API_KEY = process.env.REACT_APP_API_KEY;


export const getWallet = async () => {
    const w: any = window;
    const provider = new ethers.providers.Web3Provider(w.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const coinbase = await signer.getAddress();
    const wallet = coinbase.toLowerCase();
    return wallet;
}

export const signInMetamask = () => async (dispatch: (arg0: { type: string; data: any | boolean }) => void) => {
    const wallet = await getWallet();
    if (wallet) {
        return API.get(`/balances?wallet=${wallet}&apikey=${API_KEY}`)
            .then((response) => {
                
                dispatch({
                    type: types.GET_WALLET_DATA,
                    data: response?.data,
                });
                return response?.data;
            })
            .catch((error) => {
                throw error;
            });
    }
};