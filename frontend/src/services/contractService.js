import web3 from './web3Service';
import nftCollateralABI from '../assets/nftCollateralABI.json';
import nftSampleABI from '../assets/nftSampleABI.json';

const nftCollateralAddress = '0xcA97f0b831C2A14E50149ABBD548328E392E4493';
const nftSampleAddress = '0x55382282FBAe9e9c3495c922554baFD903DACA75';

const nftCollateral = new web3.eth.Contract(nftCollateralABI, nftCollateralAddress);
const nftSample = new web3.eth.Contract(nftSampleABI, nftSampleAddress);

export const contracts = {
    nftCollateralAddress: nftCollateralAddress,
    nftSampleAddress: nftSampleAddress,
    nftCollateral: nftCollateral,
    nftSample: nftSample
};
