import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export default function Search({ placeholder}: {placeholder: string}) {
    const router = useRouter();
    const [text, setText] = useState("")
    const query = useDebounce(text, 500)
    const pathname = usePathname()

    
    useEffect(() => {
        if(!query){
            router.push(pathname)
            return;
        }
        router.push(`${pathname}?search=${query}`)
    } , [pathname, query, router])
  return (
    <div className="relative rounded-sm border flex-grow">
        <div className='pointer-events-none absolute inset-y-4 inset-x-4'>
            <SearchIcon 
                className="h-6 w-6 text-text-placeholder"
                aria-hidden="true"
            />
        </div>
        <input 
            value={text}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
            className="block w-full text-text-primary bg-background-layer-1  rounded-sm tracking-wide border-0 py-4 px-12"
        />
    </div>
  )
}
