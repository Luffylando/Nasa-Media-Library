import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TSearchResult } from '../../types';

const Show = () => {
    const { nasa_id } = useParams();
    const [data, setData] = useState<TSearchResult>({
        href: '',
        items: [],
        links: [],
        metadata: {
            total_hits: 0,
        },
        version: '',
    });

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        const getResult = async () => {
            const result = await axios.get(`${API_URL}/search?nasa_id=${nasa_id}`);
            setData(result.data.collection);
        };
        getResult();
    }, [nasa_id]);

    const parsedData = data.items.length && data.items[0].data[0];

    return parsedData ? (
        <div>
            <div className='py-10 px-4 flex-col lg:flex lg:flex-row items-start justify-start mt-0 lg:mt-20 relative z-1'>
                <img
                    src={data.items[0].links[0].href}
                    className='flex justify-center object-contain rounded h-80 w-full lg:w-1/2'
                />
                <div className='flex-col text-white w-[90%] lg:w-1/2 backdrop-blur-sm py-20 mx-4 px-4 rounded-md'>
                    <p className='text-center font-bold text-2xl mb-10'>{parsedData.title}</p>
                    <p className='text-justify text-lg mb-10'>{parsedData.description}</p>
                    {parsedData.location && (
                        <p className='text-center text-lg mb-10'>Location: {parsedData.location}</p>
                    )}
                    {parsedData.photographer && (
                        <p className='text-center text-lg mb-10'>
                            Photographer: {parsedData.photographer}
                        </p>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div>Loading ...</div>
    );
};

export default Show;
