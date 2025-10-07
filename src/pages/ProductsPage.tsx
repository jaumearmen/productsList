import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { Product, ProductResponse } from '@/types/product';

// shadcn/ui imports
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { Search, ChevronLeft, ChevronRight, DollarSign, Star } from 'lucide-react';

const PRODUCTS_PER_PAGE = 9;
const API_BASE_URL = 'https://dummyjson.com/products';
const DEBOUNCE_DELAY_MS = 300;

// --- Internal Component: Product Card ---
interface ProductCardProps {
    product: Product;
    onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onClick }) => {
    return (
        <Card 
            className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
            onClick={() => onClick(product.id)}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/1e293b?text=Product'; 
                    }}
                />
            </div>
            <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg truncate">{product.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2 h-8">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{product.rating.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center text-lg font-bold text-green-600">
                        <DollarSign className="h-5 w-5 mr-0.5" />
                        {product.price.toFixed(0)}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full text-xs" onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from firing
                    onClick(product.id);
                }}>
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
});


// --- Main Component: Products Page ---

const ProductsPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Local state for search query (input value)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    // NEW: Apply debounce to the search term (300ms delay)
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY_MS);

    // Calculate skip value for the API
    const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

    // Construct the API URL based on debounced search term
    const url = debouncedSearchTerm
        ? `${API_BASE_URL}/search?q=${debouncedSearchTerm}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
        : `${API_BASE_URL}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    
    // useFetch now depends on the debounced value and skip
    const { data: response, loading, error } = useFetch<ProductResponse>(url, [debouncedSearchTerm, skip]);

    // Calculate total pages
    const totalPages = response ? Math.ceil(response.total / PRODUCTS_PER_PAGE) : 1;

    // --- Handlers ---

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the input state immediately
        setSearchTerm(event.target.value);
        // Reset to page 1 ONLY when search term changes, 
        // to ensure we start the new search query from the beginning.
        setCurrentPage(1); 
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleProductClick = useCallback((id: number) => {
        navigate(`/products/${id}`);
    }, [navigate]);

    // --- Render Logic ---

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                <h1 className="text-2xl font-bold">{t('error.fetch_title', {defaultValue: 'Failed to Load Products'})}</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    const products = response?.products || [];

    return (
        <div className="p-6 md:p-10 min-h-screen">
            <header className="max-w-7xl mx-auto mb-8 space-y-4">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    {t('product_list.title', {defaultValue: 'Product Catalog'})}
                </h1>
                
                {/* Search Bar */}
                <div className="relative max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={t('product_list.search_placeholder', {defaultValue: 'Search by product name...'})}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 h-11 rounded-xl shadow-md transition-shadow focus-within:shadow-lg"
                        disabled={loading && !response} // Disable input on initial load
                    />
                </div>
            </header>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading && products.length === 0 ? (
                        // Skeleton loading state for the grid
                        Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                            <div key={index} className="space-y-3">
                                <Skeleton className="h-48 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                    ) : products.length > 0 ? (
                        // Render products
                        products.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onClick={handleProductClick} 
                            />
                        ))
                    ) : (
                        // No results state
                        <div className="lg:col-span-3 text-center p-12 bg-card rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold">{t('product_list.no_results_title', {defaultValue: 'No Products Found'})}</h2>
                            <p className="text-muted-foreground">{t('product_list.no_results_desc', {defaultValue: 'Try adjusting your search filters or check your spelling.'})}</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto mt-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => handlePageChange(currentPage - 1)} 
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <span className="flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-primary bg-accent rounded-md shadow-sm pointer-events-none">
                                    {t('common.page_x_of_y', {
                                        defaultValue: `Page ${currentPage} of ${totalPages}`,
                                        currentPage, 
                                        totalPages
                                    })}
                                </span>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => handlePageChange(currentPage + 1)} 
                                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;