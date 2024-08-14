import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <section className="custom_container flex_center min-h-screen">
            <div className="text-center">
                <h1 className="text-[62px]">Page Not Found</h1>
                <Link to="/">
                    <button className="btn">Go Back</button>
                </Link>
            </div>
        </section>
    );
}
