import web3 from './web3Service';
import nftCollateralABI from '../assets/nftCollateralABI.json';
import nftSampleABI from '../assets/nftSampleABI.json';

const nftCollateralAddress = '0x63DA95Cb7E4DD341c3c8595de6fB0a7754fE8969';
const nftSampleAddress = '0x3dB66174c23ED1C4C781E30e64a3Ee4dF5fbB47c';

const nftCollateral = new web3.eth.Contract(nftCollateralABI, nftCollateralAddress);
const nftSample = new web3.eth.Contract(nftSampleABI, nftSampleAddress);

export const contracts = {
    nftCollateralAddress: nftCollateralAddress,
    nftSampleAddress: nftSampleAddress,
    nftCollateral: nftCollateral,
    nftSample: nftSample
};
