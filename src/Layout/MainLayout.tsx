import { Link } from 'react-router-dom';
import { HeaderStyle, LayoutWrapper, ChildrenWrapper, LinkStyle } from "./style";
import nasa from '../assets/nasa.png';
import { SVGWrapper } from '../Pages/Search/style';
import spaceship from '../assets/svgs/spaceship-svgrepo-com.svg'
import { SVG } from '../Pages/Search/style';

type TChildren = {
    children: React.ReactNode
}

const MainLayout = ({ children }: TChildren) => {
    return (
        <LayoutWrapper className="font-mono" >
            <SVGWrapper>
                <div className="circle">
                    <SVG src={spaceship} width="150px" height="150px" />
                </div>
            </SVGWrapper>
            <HeaderStyle>
                <LinkStyle>
                    <Link to="/"><img src={nasa} className="p-4 h-40" /></Link>
                </LinkStyle>
            </HeaderStyle>
            <ChildrenWrapper>
                {children}
            </ChildrenWrapper>
        </LayoutWrapper>
    )
}

export default MainLayout