import styled from "styled-components";

export const HeaderStyle = styled.header`
    height: 40px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;

`;

export const FooterStyle = styled.footer`
   background: #fff;
   position: fixed;
   bottom: 0;
   width: 100%;
   height: 40px;
   border-top: 1px solid black;
   display: flex;
   align-items: center;
   justify-content: center;
`;

export const LayoutWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const ChildrenWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
`;

export const LinkStyle = styled.div`
    color: #000;
    margin: 0px 6px;
`;