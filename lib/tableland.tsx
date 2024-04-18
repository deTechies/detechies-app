


export const TablelandGateway =
  "https://testnets.tableland.network/api/v1/query?statement=";

export const getTableland = async (queryString:string) => {
  const getAllSchemasQuery =
    TablelandGateway + queryString
  try {
    const result = await fetch(getAllSchemasQuery);
    return result.json();
  } catch (err) {
    return null;
  }
};

export const tables = {
    profiles: "profiles_421614_699",
    profilePools: "profilePools_421614_700",
    pools: "pools_421614_701",
    pools_reviews: "pools_reviews_421614_702",
    pools_allocations: "pools_allocations_421614_703",
    pools_distributions: "pools_distributions_421614_704",
    profiles_members: "profiles_members_421614_705",
    pools_maci_contracts: "pools_maci_contracts_421614_706",
  };