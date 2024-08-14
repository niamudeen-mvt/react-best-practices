export default function ProductCard({ product }) {
    return (
        <article
            key={product.id}
            className="flex items-center gap-4 bg-gray-50 rounded-lg cursor-pointer"
        >
            <figure className="w-24 h-24 ">
                <img
                    src={product.thumbnail}
                    alt=""
                    className="w-full object-cover"
                />
            </figure>
            <div>
                <h3 className="text-xs sm:text-sm">{product.title}</h3>
            </div>
        </article>
    );
}
