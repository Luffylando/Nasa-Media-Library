import { Link } from 'react-router-dom';
import { HeaderStyle, FooterStyle, LayoutWrapper, ChildrenWrapper, LinkStyle } from "./style";

type TChildren = {
    children: React.ReactNode
}

const MainLayout = ({ children }: TChildren) => {
    return (
        <LayoutWrapper>
            <HeaderStyle>
                <LinkStyle>
                    <Link to="/">Home</Link>
                </LinkStyle>
            </HeaderStyle>
            <ChildrenWrapper>
                {children}
            </ChildrenWrapper>
            <FooterStyle>FOOTER</FooterStyle>
        </LayoutWrapper>
    )
}

export default MainLayout