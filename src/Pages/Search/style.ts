import styled from "styled-components";
import nasaImg from '../../assets/nasa.png';
import background from '../../assets/mounting.jpg'
import { ReactSVG } from "react-svg";

interface SVGProps {
    color?: string,
    width?: string,
    height?: string
}

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

export const Wrapper = styled.div`
    background-image: url(${background});
`
export const SVG = styled(ReactSVG) <SVGProps>`
    & div svg g path {
        fill: ${(props) => (props.color ? props.color : 'currentColor')};
    }
    & svg, div {
        height: ${(props) => (props.height ? props.height : '20px')};
        width: ${(props) => (props.width ? props.width : '20px')};
    }
`;

export const SVGWrapper = styled.div`
    .circle {
        position: absolute;

        -webkit-animation: moveCircle 25s linear infinite; /* Chrome, Safari 5 */
        -moz-animation: moveCircle 25s linear infinite; /* Firefox 5-15 */
        -o-animation: moveCircle 25s linear infinite; /* Opera 12+ */
        animation: moveCircle 25s linear infinite; /* Chrome, Firefox 16+, IE 10+, Safari 5 */
    }
    @-webkit-keyframes moveCircle {
        from { -webkit-transform: rotate(360deg) translateX(50%) rotate(0deg); }
        to   { -webkit-transform: rotate(0deg) translateX(750px) rotate(0deg); }
    }
    @-moz-keyframes moveCircle {
        from { -moz-transform: rotate(360deg) translateX(750px) rotate(0deg); }
        to   { -moz-transform: rotate(0deg) translateX(750px) rotate(0deg); }
    }
    @-o-keyframes moveCircle {
        from { -o-transform: rotate(360deg) translateX(750px) rotate(0deg); }
        to   { -o-transform: rotate(0deg) translateX(750px) rotate(0deg); }
    }
    @keyframes moveCircle {
        from { transform: rotate(360deg) translateX(400px) rotate(0deg);}
        to   { transform: rotate(0deg) translateX(400px) rotate(0deg);}
    }
`;