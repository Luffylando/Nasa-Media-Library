import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { TSearchPageCard } from '../types';
const LazyImg = lazy(() => import('./LazyImg'));

const SearchPageCard = ({ nasa_id, thumbnail, title, location, photographer }: TSearchPageCard) => {
    return (
        <div
            key={nasa_id}
            className='max-w-[100%] w-[100%] min-h-full hover:border-gray-300 rounded-md cursor-pointer hover:scale-[103%] ease-in duration-200'
        >
            <Link to={`/show/${nasa_id}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyImg thumbnail={thumbnail} />
                </Suspense>
                <div className='text-white backdrop-blur-sm p-4'>
                    <p>
                        Title: {title.substring(0, 25)} {title.length > 24 && '...'}
                    </p>
                    <p>Location: {location ? location : '/'}</p>
                    <p>Photographer: {photographer ? photographer : '/'}</p>
                </div>
            </Link>
        </div>
    );
};

export default SearchPageCard;
