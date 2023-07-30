import styled from "styled-components";
import bg from '../assets/3.jpg';

export const HeaderStyle = styled.header`
    height: 200px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
`;

export const FooterStyle = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    border-top: 1px dotted grey;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LayoutWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100%;
    min-height: 100vh;
    background-image: url(${bg});
    background-size: cover;
    background-repeat: no-repeat;
`;

export const ChildrenWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
`;

export const LinkStyle = styled.div`
    color: #000;
    margin: 0px 6px;
`;