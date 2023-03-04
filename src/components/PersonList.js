import PersonCard from '../components/PersonCard';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const PersonList = ({ items }) => {
    return (
        <Wrapper>
            {items.map((item, index) => {
                return <PersonCard key={index} item={item} />;
            })}
        </Wrapper>
    );
};
export default PersonList;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    align-items: flex-start;
    gap: 2rem;
    article {
        width: 100%;
    }
    @media ${breakpoints.sm} {
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        gap: 1rem;
    }
`;
