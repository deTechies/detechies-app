import { useEffect, useState } from 'react';

// Define a generic type for the hook, allowing users of the hook
// to specify the expected shape of the returned data.
function useFetchData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const baseURL = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
        const url = `${baseURL}${path}`;
        const result = await fetch(url).then(res => res.json());
        
        // Handle any errors that occurred during fetch
        if (result.error) {
          throw new Error(result.error);
        }

        setData(result as T);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAll();
  }, [path]);

  // Return the state variables so they can be used by the component that calls the hook
  return { data, loading, error };
}

export default useFetchData;
