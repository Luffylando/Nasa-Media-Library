import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import debounce from 'lodash.debounce';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from './validation';
import { inputStyle, inputErrorStyle } from '../../tailwindCustomStyles';
import { TSearchPageForm, TSearchResult } from '../../types';
import { YearPickerStyle } from './style';
import Pagination from '../../components/Pagination';
import SearchPageCard from '../../components/SearchPageCard';

const Search = () => {
    const [totalData, setTotalData] = useState<number>(0);
    const [yearStart, setYearStart] = useState<Date | undefined>(undefined);
    const [yearEnd, setYearEnd] = useState<Date | undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [page, setPage] = useState<{ previousPage: number; currentPage: number }>({
        previousPage: 0,
        currentPage: 1,
    });
    const [searchResults, setSearchResults] = useState<TSearchResult>({
        href: '',
        items: [],
        links: [],
        metadata: {
            total_hits: 0,
        },
        version: '',
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
    });

    const onSubmit = handleSubmit(async (data) => {
        setErrorMsg('');
        const phraseQuery = data.phrase ? `?q=${data.phrase}` : '';
        const startYear = yearStart ? `&year_start=${yearStart?.getFullYear()}` : '';
        const endYear = yearEnd ? `&year_end=${yearEnd?.getFullYear()}` : '';
        const mediaType = '&media_type=image';
        const pageNumber = `&page=1`;
        const PAGE_SIZE = `&page_size=${ITEMS_PER_PAGE}`;

        const results = await axios.get(
            `${API_URL}/search${phraseQuery}${startYear}${endYear}${mediaType}${PAGE_SIZE}${pageNumber}`,
        );

        if (results.data.collection.items.length === 0) {
            console.log('test');
            setErrorMsg(`No results found for Phrase: ${data.phrase}`);
            setSearchResults({
                href: '',
                items: [],
                links: [],
                metadata: {
                    total_hits: 0,
                },
                version: '',
            });
        } else {
            setTotalData(results.data.collection.metadata.total_hits);
            setSearchResults(results.data.collection);
        }
        setPage({ currentPage: 1, previousPage: 0 });
        reset();
        setYearStart(undefined);
        setYearEnd(undefined);
    });

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
                setPage({
                    currentPage: Math.floor(totalData / ITEMS_PER_PAGE),
                    previousPage: page.currentPage,
                });
                break;
            default:
                break;
        }
    };

    const debounceHandlePageChange = debounce(handlePageChange, 500);

    useEffect(() => {
        if (yearEnd && yearStart && yearEnd < yearStart) {
            setYearEnd(yearStart);
        }
    }, [yearEnd, yearStart]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const getData = async () => {
            if (searchResults?.links?.length) {
                let createdUrl: string = '';
                const splittedUrl = searchResults.links[0]?.href.split('&');
                for (let i = 0; i < splittedUrl.length; i += 1) {
                    if (i === splittedUrl.length - 1) {
                        createdUrl += `page=${page.currentPage.toString()}`;
                    } else {
                        createdUrl += `${splittedUrl[i]}&`;
                    }
                }
                const results = await axios.get(createdUrl, { signal });
                setSearchResults(results.data.collection);
                return () => {
                    controller.abort();
                };
            }
        };
        getData();
    }, [page.currentPage]);

    return (
        <div className='py-4 px-0 flex flex-col items-center justify-center mt-10 relative'>
            <form
                onSubmit={onSubmit}
                className='py-0 px-4 lg:px-48 lg:grid grid-cols-4 gap-4 h-20 gap-x-4 mb-20 min-h-auto w-full '
            >
                <div className='flex flex-col w-full mb-2 items-center'>
                    <input
                        {...register('phrase')}
                        placeholder='Enter Phrase'
                        className={`${inputStyle} rounded w-full max-w-[400px]`}
                    />
                    {errors?.phrase && <p className={inputErrorStyle}>{errors.phrase.message}</p>}
                </div>
                <div className='flex flex-col w-full mb-2 items-center'>
                    <YearPickerStyle className='flex flex-col mb-2 w-full max-w-[400px] justify-center items-center'>
                        <DatePicker
                            className={`${inputStyle} rounded`}
                            selected={yearStart}
                            onChange={(date: Date) => setYearStart(date)}
                            showYearPicker
                            dateFormat='yyyy'
                            placeholderText='Year Start'
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </YearPickerStyle>
                </div>
                <div className='flex flex-col w-full mb-2 items-center'>
                    <YearPickerStyle className='flex-col mb-2 w-full max-w-[400px]'>
                        <DatePicker
                            className={`${inputStyle} rounded`}
                            selected={yearEnd}
                            onChange={(date: Date) => setYearEnd(date)}
                            showYearPicker
                            dateFormat='yyyy'
                            minDate={yearStart || null}
                            placeholderText='Year End'
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </YearPickerStyle>
                </div>
                <div className='flex flex-col w-full mb-2 items-center lg:items-stretch '>
                    <button
                        type='submit'
                        className='flex justify-center items-center w-full lg:w-auto h-12 border-2
                     border-white px-4 hover:border-white-100 rounded
                      backdrop-blur-lg bg-transparent text-white max-w-[400px]'
                    >
                        Search
                    </button>
                </div>
            </form>

            {errorMsg && <p className='text-2xl font-bold text-white text-center'>{errorMsg}</p>}
            {searchResults.items.length ? (
                <div className='grid grid-cols-1 mt-40 px-4 lg:px-0 lg:mt-0 lg:grid-cols-3 grid-flow-row gap-6 '>
                    {searchResults.items.map((item) => {
                        const title = item.data[0].title;
                        const location = item.data[0].location;
                        const thumbnail = item.links[0].href;
                        const nasa_id = item.data[0].nasa_id;
                        const photographer = item.data[0].photographer;
                        return (
                            <SearchPageCard
                                key={nasa_id}
                                title={title}
                                location={location}
                                thumbnail={thumbnail}
                                nasa_id={nasa_id}
                                photographer={photographer}
                            />
                        );
                    })}
                </div>
            ) : null}
            {searchResults.items.length ? (
                <Pagination
                    handlePageChange={(action) => debounceHandlePageChange(action)}
                    handleSetPage={setPage}
                    page={page}
                    totalData={totalData}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            ) : null}
        </div>
    );
};

export default Search;
