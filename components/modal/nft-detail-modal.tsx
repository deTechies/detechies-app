
import Image from 'next/image';
import { Button } from '../ui/button';
import ModalLayout from './modal-layout';




export default function NftDetailModal({ nft, showModal, open, setShowModal }: any) {


return (
    <ModalLayout title="" showModal={showModal}>
        <h3>
            Web3 Influencer
        </h3>
        <p>
        We have found your web3 social accounts. You can get membership NFT as web3 influencer.
        </p>
        <Image
            src={nft.image}
            width={500}
            height={500}
            alt="something"
        />
        
        <table>
            <tr>
                <td>name</td>
                <td>{nft.name}</td>
            </tr>
        </table>
        
        <div>
            <h5>{nft.name}</h5>
            <span>{nft.description}</span>
            <span>{nft.date}</span>
        </div>
        <div>
            <Button>
                No, thanks
            </Button>
            <Button>
                Get NFT    
            </Button>
        </div>
    </ModalLayout>
)
}