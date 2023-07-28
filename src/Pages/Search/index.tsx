import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from "./validation"
import DatePicker from 'react-datepicker'
import styled from 'styled-components';
import { inputStyle, inputErrorStyle, inputLabel } from '../../tailwindCustomStyles';
import { TSearchPageForm } from '../../types';


const Search = () => {
    const [yearStart, setYearStart] = useState<Date | null>(null);
    const [yearEnd, setYearEnd] = useState<Date | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TSearchPageForm>({
        resolver: yupResolver(searchSchema),
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        reset();
    })

    const YearPickerStyle = styled.div`
        .react-datepicker__year-wrapper {
            width: 210px !important;
            max-width: 220px;
        }
    `

    useEffect(() => {
        if (yearEnd && yearStart && yearEnd < yearStart) {
            setYearEnd(yearStart)
        }
    }, [yearStart, yearEnd])

    return (
        <div className="py-10 px-4 flex">
            <form onSubmit={onSubmit} className="py-10 border border-gray-900 gap-2 flex">
                <div className="flex-col">
                    <label className={inputLabel}>Title</label>
                    <input {...register("keyword")} placeholder="Enter Keyword" className={inputStyle} />
                    {errors?.keyword && <p className={inputErrorStyle}>{errors.keyword.message}</p>}
                </div>
                <YearPickerStyle>
                    <DatePicker
                        className="w-20 border border-grey-700 h-8"
                        selected={yearStart}
                        onChange={(date: Date) => setYearStart(date)}
                        showYearPicker
                        dateFormat="yyyy"
                        placeholderText='Start Year'
                    />
                </YearPickerStyle>
                <YearPickerStyle>
                    <DatePicker
                        className="w-20 border border-grey-700 h-8"
                        selected={yearEnd}
                        onChange={(date: Date) => setYearEnd(date)}
                        showYearPicker
                        dateFormat="yyyy"
                        minDate={yearStart || null}
                        placeholderText='End Year'

                    />
                </YearPickerStyle>
                {/* <input {...register("yearStart")} placeholder="Year Start" className="border border-gray-400" />
                <input {...register("yearEnd")} placeholder="Year End" className="border border-gray-400" /> */}

                <button type="submit" className="h-8 border border-gray-400 px-4">search</button>
            </form>
        </div>
    )
}

export default Search