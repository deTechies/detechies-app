import ConnectGithub from '@/components/connections/github';
import Loading from '@/components/loading';
import useFetchData from '@/lib/useFetchData';
import { truncateMiddle } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const networks = [
    {
        image: '/icons/ens.png',
        name: 'ENS',
        link: 'https://app.ens.domains/name/',
    },
    {
        image: '/icons/farcaster.png',
        name: 'farcaster',
        link: 'https://farcaster.network/',
    },
    {
        image: '/icons/lenster.png',
        name: 'lenster',
        link: 'https://lenster.app/',
    },
    {
        image: '/icons/twitter.png',
        name: 'twitter',
        link: 'https://twitter.com/',
    },
    {
        image: '/icons/nextid.png',
        name: 'nextid',
        link: 'https://ethereum.org/en/',
    },
]
interface Identity {
    platform: string;
    identity: string;
  }
  
  interface Neighbor {
    identity: Identity;
  }
  
  interface Data {
    neighbor: Neighbor[];
    updatedAt: number;
  }

export default function Connections({address, github}: {address:string, github?: string[]}) {
    const {data, loading, error} = useFetchData<Data>(`/nextid/user/profile/ethereum/${address}`);

    
    if(loading) return <Loading />
    
    if(error) return <div>error</div>
    console.log(data);
  return (
    <section className="grid grid-cols-3 gap-4">
       
                <div  className="flex border p-4 border-border-div rounded-sm items-center gap-4">
                    <Image 
                        src='/icons/github.png' 
                        alt='github' 
                        width={44}
                        height={44}
                        className='rounded-sm'
                        />
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm text-text-primary capitalize">Github</span>
                        {
            github ?  (
                        <Link 
                         className="text-sm text-text-secondary font-light" 
                        href={`
                        https://github.com`}
                        >
                            {github[0]}
                            </Link>
                             ): (
                <ConnectGithub />
                                )
                            }
                    </div>
                </div>
           
        {
            networks.map((network:any, key:number) => (
                <div key={key} className="flex border p-4 border-border-div rounded-sm items-center gap-4">
                    <Image 
                        src={network.image} 
                        alt={network.name} 
                        width={44}
                        height={44}
                        className='rounded-sm'
                        />
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm text-text-primary capitalize">{network.name}</span>
                        {
                            data?.neighbor  && data.neighbor.map((item) => {
                                if(item.identity.platform === network.name) {
                                    return (
                                        <Link 
                                        key={item.identity.identity} className="text-sm text-text-secondary font-light" 
                                        href={`${network.link}/${item.identity.identity}`}>
                                            {truncateMiddle(item.identity.identity, 20)}
                                            </Link>
                                    )
                                }
                            })
                        }
                        {
                            !data?.neighbor || !data.neighbor.some(item => item.identity.platform === network.name) && 
                               ( network.name === 'github' ?
                                <ConnectGithub /> :
                                <a href={`https://${network.name}.com`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-primary font-light">
                                    Connect 
                                </a>
                            )
                        }
                    </div>
                </div>
            ))
        }
        <span className='text-xs tracking-wider text-text-secondary col-span-3 font-light  text-right'>
            Last updated: {data && new Date(data.updatedAt * 1000).toLocaleString()}
        </span>
    </section>
  )
}
