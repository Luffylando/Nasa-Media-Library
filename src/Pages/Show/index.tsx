import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TSearchResult } from '../../types';
import ShowPageCard from '../../components/ShowPageCard';

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

    return data.items.length ? <ShowPageCard {...data} /> : <div>Loading ...</div>;
};

export default Show;
