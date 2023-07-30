import styled from "styled-components";
import nasaImg from '../../assets/nasa.jpg';

export const YearPickerStyle = styled.div`
    .react-datepicker-wrapper, .react-datepicker__input-container > input {
        width: 100%;
    }
    .react-datepicker__year-wrapper {
        @media only screen and (min-width: 1440px) {
            width: 210px !important;
            max-width: 210px;
        }
    }
`

export const NasaImagePlaceholder = styled.div`
    height: 300px;
    width: 300px;
    background-image: url(${nasaImg});
`;