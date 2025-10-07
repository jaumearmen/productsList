import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useFetch } from '@/hooks/useFetch';
import { Product } from '@/types/product';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, DollarSign, Tag, Star } from 'lucide-react';

const API_BASE_URL = 'https://dummyjson.com/products';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const { data: product, loading, error } = useFetch<Product>(
        id ? `${API_BASE_URL}/${id}` : '',
        [id]
    );

    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto space-y-4">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid md:grid-cols-2 gap-6">
                    <Skeleton className="h-96 w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-10 w-full mt-4" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-8 max-w-4xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">{t('error.title', {defaultValue: 'Error Loading Product'})}</h1>
                <p>{error?.message || t('error.not_found', {defaultValue: 'Product not found or an error occurred.'})}</p>
                <Button onClick={() => navigate('/products')} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back_to_list', {defaultValue: 'Back to Products'})}
                </Button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-12 min-h-screen bg-background">
            <div className="max-w-6xl mx-auto">
                <Button variant="ghost" onClick={() => navigate('/products')} className="mb-6 hover:bg-accent transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> 
                    {t('common.back_to_products', {defaultValue: 'Back to Products'})}
                </Button>

                <Card className="shadow-2xl overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-4xl font-extrabold text-primary">
                            {product.title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <img 
                                src={product.thumbnail} 
                                alt={product.title} 
                                className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/600x400/1e293b/e2e8f0?text=Image+Missing'; 
                                }}
                            />
                            <div className="flex space-x-2 mt-4 overflow-x-auto p-1">
                                {product.images.slice(0, 4).map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`${product.title} secondary image ${index + 1}`} 
                                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" 
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <p className="text-lg text-muted-foreground leading-relaxed border-b pb-4">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 border-b pb-4">
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{t('product.price', {defaultValue: 'Price'})}</p>
                                        <p className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                
                                {product.discountPercentage > 0 && (
                                    <div className="flex items-center space-x-2">
                                        <Tag className="h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">{t('product.discount', {defaultValue: 'Discount'})}</p>
                                            <p className="text-xl font-semibold text-orange-500">
                                                {product.discountPercentage}% OFF
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-3">
                                <p className="text-md font-semibold">
                                    {t('product.brand', {defaultValue: 'Brand'})}: <span className="font-normal text-muted-foreground">{product.brand}</span>
                                </p>
                                <p className="text-md font-semibold">
                                    {t('product.category', {defaultValue: 'Category'})}: <Badge variant="secondary" className="ml-2">{product.category}</Badge>
                                </p>
                                <p className="text-md font-semibold flex items-center">
                                    {t('product.rating', {defaultValue: 'Rating'})}: 
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-2 mr-1" />
                                    <span className="font-normal text-primary">{product.rating} / 5</span>
                                </p>
                                <p className="text-md font-semibold">
                                    {t('product.stock', {defaultValue: 'Stock'})}: 
                                    <Badge variant={product.stock > 10 ? "default" : "destructive"} className="ml-2">
                                        {product.stock} {t('common.in_stock', {defaultValue: 'in stock'})}
                                    </Badge>
                                </p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end p-6 pt-0">
                        <Button size="lg" className="text-lg font-semibold shadow-xl transition-all hover:scale-[1.02]">
                            {t('product.add_to_cart', {defaultValue: 'Add to Cart'})}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ProductDetail;