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
            total_hits: 0
        },
        version: ''
    });

    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {

        const getResult = async () => {
            const result = await axios.get(`${API_URL}/search?nasa_id=${nasa_id}`);
            console.log('NEWWW', result.data.collection);
            setData(result.data.collection);
        }
        getResult();
    }, [nasa_id]);

    return (
        data.items.length ? (
            <div>
                <div className="py-10 px-4 flex-col align-center justify-center">
                    <img src={data.items[0].links[0].href} className="flex justify-center align-items m-auto object-contain rounded h-80 " />
                    <div className="py-4 px-40 flex-col">
                        <p className="text-center font-bold text-2xl mb-10">{data.items[0].data[0].title}</p>
                        <p className="text-center text-lg mb-10">{data.items[0].data[0].description}</p>
                        {data.items[0].data[0].location &&
                            <p className="text-center text-lg mb-10">Location:  {data.items[0].data[0].location}</p>
                        }
                        {data.items[0].data[0].photographer &&
                            <p className="text-center text-lg mb-10">Photographer:  {data.items[0].data[0].photographer}</p>
                        }
                    </div>
                </div>

            </div>


        ) :
            <div>Loading ...</div>
    )
}

export default Show