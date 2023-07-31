import DatePicker from 'react-datepicker';
import { inputStyle, inputErrorStyle } from '../tailwindCustomStyles';
import { YearPickerStyle } from '../Pages/Search/style';
import { TSearchForm } from '../types';

const SearchForm = ({
    yearStart,
    yearEnd,
    onSubmit,
    name,
    errors,
    setYearStart,
    setYearEnd,
    register,
}: TSearchForm) => {
    return (
        <form
            onSubmit={onSubmit}
            className='py-0 px-4 lg:px-48 lg:grid grid-cols-4 gap-4 h-20 gap-x-4 mb-20 min-h-auto w-full '
        >
            <div className='flex flex-col w-full mb-2 items-center'>
                <input
                    {...register(name)}
                    name={name}
                    placeholder='Enter Phrase'
                    className={`${inputStyle} rounded w-full max-w-[400px]`}
                />
                {errors?.phrase && <p className={inputErrorStyle}>{errors.phrase.message}</p>}
            </div>
            <div className='flex flex-col w-full mb-2 items-center'>
                <YearPickerStyle className='flex flex-col mb-2 w-full max-w-[400px] justify-center items-center'>
                    <DatePicker
                        name='yearStart'
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
                        name='yearEnd'
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
    );
};

export default SearchForm;
