import useFetchData from "@/lib/useFetchData";

export default function GithubProfile({username}: {username: string}) {
    
    const {data, loading, error} = useFetchData<any[]>(`/github/github/contributions/${username[0]}`);
    
    if(loading) return <div>loading...</div>
    if(error) return <div>{error}</div>
  return (
    <div className="text">

        {username[0]}
        
        {JSON.stringify(data, null, 2)}
    </div>
  )
}
