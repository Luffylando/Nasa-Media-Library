import { TSearchResult } from '../types';

const ShowPageCard = (data: TSearchResult) => {
    return (
        <div className='py-10 px-4 flex-col lg:flex lg:flex-row items-start justify-start mt-0 lg:mt-20 relative z-1'>
            <img
                src={data.items[0].links[0].href}
                className='flex justify-center object-contain rounded h-80 w-full lg:w-1/2'
            />
            <div className='flex-col text-white w-[90%] lg:w-1/2 backdrop-blur-sm py-20 mx-4 px-4 rounded-md'>
                <p className='text-center font-bold text-2xl mb-10'>
                    {data.items[0].data[0].title}
                </p>
                <p className='text-justify text-lg mb-10'>{data.items[0].data[0].description}</p>
                {data.items[0].data[0].location && (
                    <p className='text-center text-lg mb-10'>
                        Location: {data.items[0].data[0].location}
                    </p>
                )}
                {data.items[0].data[0].photographer && (
                    <p className='text-center text-lg mb-10'>
                        Photographer: {data.items[0].data[0].photographer}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShowPageCard;
