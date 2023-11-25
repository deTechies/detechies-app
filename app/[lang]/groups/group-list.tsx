import GroupListItem from "./group-list-item";

//TODO: Add type dependency
export default function GroupList({
  groups} : {groups: any[]}) {
  
  //const { search: searchValue } = searchParams as { [key: string]: string };


  //const resultsText = products.length > 1 ? 'results' : 'result';
  
  return <div className="w-full grid md:grid-cols-2 gap-4 items-stretch">
    { 
      groups.map((group: any, key:number) => {
        return <GroupListItem key={key} details={group} />
      })
    }
  </div>;
}

