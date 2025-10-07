import { useState, useEffect } from 'react';
import { FetchState } from '@/types/product';

export function useFetch<T>(url: string, dependencies: any[] = []): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            setState(prev => ({ ...prev, loading: true, error: null }));

            try {
                if (!url) {
                    setState(prev => ({ ...prev, loading: false }));
                    return;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json: T = await response.json();
                
                if (isMounted) {
                    setState({ data: json, loading: false, error: null });
                }
            } catch (err) {
                if (isMounted) {
                    const error = (err instanceof Error) ? err : new Error('An unknown error occurred during fetch.');
                    setState({ data: null, loading: false, error });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
        
    }, [url, ...dependencies]);

    return state;
}