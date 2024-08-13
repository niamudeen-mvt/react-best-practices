import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const PRODUCT_FETCH = 'https://dummyjson.com/products'

export default function LandingPage() {

  const [searchTerm, setSearchTerm] = useState('')

  const valueToSeach = useDebounce(searchTerm, 300)


  const handleOnChange = (e) => {
    const { value } = e.target
    setSearchTerm(value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  const { data: products, isLoading: isFetchingProducts, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(PRODUCT_FETCH)
      return response?.data?.products || []
    },
  })


  const filterProducts = products && products.filter(product => {
    if (!valueToSeach) return true

    return product.title.toLowerCase().includes(valueToSeach.toLowerCase())
  })


  if (isFetchingProducts) return Loader()

  if (isError) return <p>{error.message}</p>

  return (
    <section className="min-h-screen container mx-auto flex flex-col items-center space-y-10 p-8">

      {/* Input Search Component */}
      <div>
        <form onSubmit={handleSubmit} >
          <Input
            type="text"
            value={searchTerm}
            handleOnChange={handleOnChange} />
        </form>
      </div>

      {/* Product List */}

      <div className="max-w-sm w-full space-y-4 max-h-[80vh] overflow-y-auto hide_scrollbar">
        {filterProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}

        {filterProducts?.length === 0 && <p className=" text-center text-gray-400">No products found</p>}

      </div>

    </section>
  )
}



function Product({ product }) {
  return <article key={product.id} className="flex items-center gap-4 bg-gray-50 rounded-lg cursor-pointer
  ">
    <figure className="w-24 h-24 ">
      <img src={product.thumbnail} alt="" className="w-full object-cover" />
    </figure>
    <div>
      <h3 className="text-xs sm:text-sm">{product.title}</h3>
    </div>
  </article>
}


function Input({ type = 'text', value, handleOnChange }) {
  return <input
    type={type}
    className="border border-black py-2 px-8 rounded-lg text-sm"
    value={value}
    onChange={handleOnChange}
    placeholder="Search products..."
  />
}



function Loader() {
  return <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
    <div class="relative inline-flex">
      <div class="w-6 h-6 bg-blue-500 rounded-full"></div>
      <div class="w-6 h-6 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
      <div class="w-6 h-6 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
  </div>
}