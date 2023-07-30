import { TPagination } from '../types';

const Pagination = ({
    handlePageChange,
    page,
    handleSetPage,
    totalData,
    itemsPerPage,
}: TPagination) => {
    return (
        <div>
            <div className='flex-col'>
                <div className='mt-10 mb-20 flex justify-center'>
                    <button
                        onClick={() => handlePageChange('first')}
                        className='text-xl mr-5 font-bold cursor-pointer text-white'
                    >
                        {`<<`}
                    </button>
                    <button
                        onClick={() => handlePageChange('prev')}
                        className='font-bold text-xl mr-4 cursor-pointer text-white'
                    >
                        {' '}
                        {` < `}
                    </button>
                    {page.currentPage > 1 && (
                        <div
                            className='border w-6 rounded-md flex justify-center mr-4 cursor-pointer px-4 text-white'
                            onClick={() =>
                                handleSetPage({
                                    currentPage: page.currentPage - 1,
                                    previousPage: page.currentPage,
                                })
                            }
                        >
                            {page.currentPage - 1}
                        </div>
                    )}
                    <div className='border border-white-900 w-6 rounded-md flex justify-center px-4 text-black bg-white'>
                        {' '}
                        {page.currentPage}{' '}
                    </div>
                    {page.currentPage < Math.floor(totalData / itemsPerPage) && (
                        <div
                            className='border w-6 rounded-md flex justify-center ml-4 cursor-pointer px-4 text-white'
                            onClick={() =>
                                handleSetPage({
                                    currentPage: page.currentPage + 1,
                                    previousPage: page.currentPage,
                                })
                            }
                        >
                            {page.currentPage + 1}
                        </div>
                    )}
                    <button
                        onClick={() => handlePageChange('next')}
                        className='font-bold text-xl ml-4 cursor-pointer text-white'
                    >
                        {' '}
                        {` > `}
                    </button>
                    <div
                        onClick={() => handlePageChange('last')}
                        className='text-xl ml-5 font-bold cursor-pointer text-white'
                    >
                        {`>>`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
