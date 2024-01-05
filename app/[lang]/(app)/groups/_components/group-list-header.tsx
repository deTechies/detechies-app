

export default function GroupListHeader() {
  // const searchParams = useSearchParams()!
  
  // const router = useRouter()
  // const pathname = usePathname()

  // const filter = searchParams.get('filter')
 
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     params.set(name, value)
 
  //     return params.toString()
  //   },
  //   [searchParams]
  // )
 
  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      <header className="flex flex-col gap-1 text-center">
        <h2 className="text-heading_s text-text-secondary">
          간단하게 그룹에 가입요청하고
        </h2>
        <h3 className="text-heading_s">캐릭터 NFT와 수상 NFT를 받아보세요!</h3>
      </header>
    </div>
  );
}
