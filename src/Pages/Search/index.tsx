import { useState, useEffect, lazy, Suspense } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import debounce from 'lodash.debounce';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from "./validation";
import { inputStyle, inputErrorStyle } from '../../tailwindCustomStyles';
import { TSearchPageForm, TSearchResult } from '../../types';
import { YearPickerStyle, NasaImagePlaceholder } from './style';
const LazyImg = lazy(() => import('../../components/LazyImg'));

const Search = () => {
    const [totalData, setTotalData] = useState<number>(0);
    const [yearStart, setYearStart] = useState<Date | undefined>(undefined);
    const [yearEnd, setYearEnd] = useState<Date | undefined>(undefined);
    const [page, setPage] = useState<{ previousPage: number, currentPage: number }>({
        previousPage: 0,
        currentPage: 1
    });
    const [searchResults, setSearchResults] = useState<TSearchResult>({
        href: '',
        items: [],
        links: [],
        metadata: {
            total_hits: 0
        },
        version: ''
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const ITEMS_PER_PAGE = 9;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TSearchPageForm>({
        resolver: yupResolver(searchSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        const phraseQuery = data.phrase ? `?q=${data.phrase}` : '';
        const startYear = yearStart ? `&year_start=${yearStart?.getFullYear()}` : '';
        const endYear = yearEnd ? `&year_end=${yearEnd?.getFullYear()}` : '';
        const mediaType = '&media_type=image';
        const pageNumber = `&page=1`;
        const PAGE_SIZE = `&page_size=${ITEMS_PER_PAGE}`;

        const results = await axios.get(`${API_URL}/search${phraseQuery}${startYear}${endYear}${mediaType}${PAGE_SIZE}${pageNumber}`);
        setSearchResults(results.data.collection)

        setPage({ currentPage: 1, previousPage: 0 })
        setTotalData(results.data.collection.metadata.total_hits);
        reset();
        setYearStart(undefined);
        setYearEnd(undefined);

    })
    console.log({ searchResults })

    const handlePageChange = (action: string) => {
        switch (action) {
            case 'next':
                if (Math.floor(totalData / ITEMS_PER_PAGE) >= page.currentPage) {
                    setPage({ currentPage: page.currentPage + 1, previousPage: page.currentPage });
                }
                break;
            case 'prev':
                if (page.currentPage > 1) {
                    setPage({ currentPage: page.currentPage - 1, previousPage: page.currentPage });
                }
                break;
            case 'first':
                setPage({ currentPage: 1, previousPage: page.currentPage });
                break;
            case 'last':
                setPage({ currentPage: Math.floor(totalData / ITEMS_PER_PAGE), previousPage: page.currentPage });
                break;
            default:
                break;
        }
    }

    const debounceHandlePageChange = debounce(handlePageChange, 500);

    useEffect(() => {
        if (yearEnd && yearStart && yearEnd < yearStart) {
            setYearEnd(yearStart)
        }
    }, [yearEnd, yearStart]);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const getData = async () => {
            if (searchResults.links.length) {
                let createdUrl: string = '';
                const splittedUrl = searchResults.links[0]?.href.split('&');
                for (let i = 0; i < splittedUrl.length; i += 1) {
                    if (i === splittedUrl.length - 1) {
                        createdUrl += `page=${page.currentPage.toString()}`
                    } else {
                        createdUrl += `${splittedUrl[i]}&`;
                    }
                }
                const results = await axios.get(createdUrl, { signal })
                setSearchResults(results.data.collection)
                return () => {
                    controller.abort();
                };
            }
        }
        getData();
    }, [page.currentPage])

    return (
        <div className="py-4 px-0 flex-col align-center justify-center">
            <form onSubmit={onSubmit} className="py-0 px-4 lg:px-48 lg:grid grid-cols-4 gap-4 h-20 gap-x-4">
                <div className="flex-col w-full mb-2">
                    <input {...register("phrase")} placeholder="Enter Phrase" className={`${inputStyle} rounded w-full`} />
                    {errors?.phrase && <p className={inputErrorStyle}>{errors.phrase.message}</p>}
                </div>
                <YearPickerStyle className="flex-col mb-2 w-full">
                    <DatePicker
                        className={`${inputStyle} rounded`}
                        selected={yearStart}
                        onChange={(date: Date) => setYearStart(date)}
                        showYearPicker
                        dateFormat="yyyy"
                        placeholderText='Year Start'
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    />
                </YearPickerStyle>
                <YearPickerStyle className="flex-col mb-2">
                    <DatePicker
                        className={`${inputStyle} rounded`}
                        selected={yearEnd}
                        onChange={(date: Date) => setYearEnd(date)}
                        showYearPicker
                        dateFormat="yyyy"
                        minDate={yearStart || null}
                        placeholderText='Year End'
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}

                    />
                </YearPickerStyle>
                <button type="submit" className="w-full lg:w-auto h-8 border border-gray-400 px-4 hover:border-gray-600 rounded">search</button>
            </form>
            {searchResults.items.length ?
                <div className="grid grid-cols-1 mt-28 px-4 lg:px-0 lg:mt-0 lg:grid-cols-3 grid-flow-row gap-6">
                    {searchResults.items.map((item) => {
                        const title = item.data[0].title;
                        // const date_created = item.data[0].date_created;
                        const location = item.data[0].location;
                        const thumbnail = item.links[0].href;
                        const nasa_id = item.data[0].nasa_id;
                        const photographer = item.data[0].photographer;
                        return (
                            <div key={nasa_id} className="max-w-[100%] w-[100%] min-h-full border border-gray-200 hover:border-gray-300 mb-4 rounded-md cursor-pointer hover:scale-[103%] ease-in duration-200">
                                <Link to={`/show/${nasa_id}`}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <LazyImg thumbnail={thumbnail} />
                                    </Suspense>
                                    <div className="p-4">
                                        <p>Title: {title.substring(0, 25)} {title.length > 24 && '...'}</p>
                                        <p>Location: {location ? location : '/'}</p>
                                        <p>Photographer: {photographer ? photographer : '/'}</p>
                                        {/* <p>Date: {new Date(date_created).toLocaleDateString()}</p> */}
                                    </div>
                                </Link>
                            </div>
                        )
                    })}

                </div>
                :
                <div className="mt-40 flex justify-center align-center">
                    <NasaImagePlaceholder />
                </div>
            }
            {
                searchResults.items.length ?
                    <div className="flex-col">
                        <div className="mt-10 mb-20 flex justify-center">
                            <button
                                onClick={() => debounceHandlePageChange('first')}
                                className="text-xl mr-5 font-bold cursor-pointer"
                            >
                                {`<<`}
                            </button>
                            <button onClick={() => debounceHandlePageChange('prev')} className="font-bold text-xl mr-4 cursor-pointer"> {` < `}</button>
                            {page.currentPage > 1 && <div className="border w-6 rounded-md flex justify-center mr-4 cursor-pointer px-4" onClick={() => setPage({ currentPage: page.currentPage - 1, previousPage: page.currentPage })}>{page.currentPage - 1}</div>}
                            <div className="border border-gray-900 w-6 rounded-md flex justify-center px-4"> {page.currentPage} </div>
                            {page.currentPage < Math.floor(totalData / ITEMS_PER_PAGE) && <div className="border w-6 rounded-md flex justify-center ml-4 cursor-pointer px-4"
                                onClick={() => setPage({ currentPage: page.currentPage + 1, previousPage: page.currentPage })}>
                                {page.currentPage + 1}
                            </div>}
                            <button onClick={() => debounceHandlePageChange('next')} className="font-bold text-xl ml-4 cursor-pointer" > {` > `}</button>
                            <div
                                onClick={() => debounceHandlePageChange('last')}
                                className="text-xl ml-5 font-bold cursor-pointer">
                                {`>>`}
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div >
    )
}

export default Search