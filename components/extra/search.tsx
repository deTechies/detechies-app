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
    <div className="relative rounded-sm border">
        <div className='pointer-events-none absolute inset-y-2 inset-x-2'>
            <SearchIcon 
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
        </div>
        <input 
            value={text}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
            className="block w-full text-muted-foreground rounded-sm tracking-wide border-0 py-2 pl-10"
        />
    </div>
  )
}
