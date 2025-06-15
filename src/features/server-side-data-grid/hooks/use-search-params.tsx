import { useSearchParams } from 'react-router-dom';

export function useGridSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  return { search, searchParams, setSearchParams };
}
