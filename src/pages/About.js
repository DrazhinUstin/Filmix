import { Title, Accordion } from '../components';
import { faqList } from '../utils/localData';
import styled from 'styled-components';

const About = () => {
    return (
        <Wrapper className='main'>
            <section className='hero'>
                <article className='hero-info'>
                    <Title margin='0'>
                        what this app <span>do?</span>
                    </Title>
                    <div className='underline'></div>
                    <p>
                        This application is designed to search for various movies and get detailed
                        information about them. Here below you can find answers to the most common
                        questions.
                    </p>
                </article>
            </section>
            <Accordion items={faqList} />
        </Wrapper>
    );
};

export default About;

const Wrapper = styled.main`
    .hero {
        height: 20rem;
        display: grid;
        place-items: center;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background: linear-gradient(
                rgba(var(--clr-rgb-black), 0.7),
                rgba(var(--clr-rgb-black), 0.7)
            ),
            url(https://wallpapercave.com/wp/wp5556216.jpg) no-repeat center/cover;
        &-info {
            max-width: 600px;
            text-align: center;
            font-size: 1.2rem;
            .underline {
                width: 10rem;
                height: 0.25rem;
                margin: 1rem auto;
                background-color: var(--clr-green);
            }
            & > p::first-letter {
                color: var(--clr-green);
            }
        }
    }
`;
