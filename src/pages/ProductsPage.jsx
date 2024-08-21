import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import useAuth from '../hooks/useAuth';
import Loader from '../components/shared/Loader';
import Input from '../components/shared/Input';
import ProductCard from '../components/search/ProductCard';

const PRODUCT_FETCH = 'https://dummyjson.com/products';

export default function ProductsPage() {
    const { isLoggedIn } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const valueToSeach = useDebounce(searchTerm, 300);

    const handleOnChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const {
        data: products,
        mutate,
        isPending: isFetchingProducts,
        isError,
        error,
    } = useMutation({
        mutationFn: async () => {
            if (!isLoggedIn) return [];
            const response = await axios.get(PRODUCT_FETCH);
            return response?.data?.products || [];
        },
    });

    useEffect(() => {
        mutate();
    }, [isLoggedIn, mutate]);

    const filterProducts =
        (products &&
            products.filter((product) => {
                if (!valueToSeach) return true;

                return product.title
                    .toLowerCase()
                    .includes(valueToSeach.toLowerCase());
            })) ||
        [];

    if (isFetchingProducts) return Loader();

    if (isError) return <p>{error.message}</p>;

    return (
        <section className="section flex-col space-y-10">
            {/* Input Search Component */}
            <div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={searchTerm}
                        handleOnChange={handleOnChange}
                        placeholder="Search Products"
                    />
                </form>
            </div>

            {/* Product List */}

            <div className="max-w-sm w-full space-y-4 max-h-[80vh] overflow-y-auto hide_scrollbar">
                {filterProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

                {filterProducts?.length === 0 && (
                    <p className=" text-center text-gray-400">
                        No products found
                    </p>
                )}
            </div>
        </section>
    );
}
