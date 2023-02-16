import { Title, Accordion } from '../components';
import { faqList } from '../utils/localData';

const About = () => {
    return (
        <main className='main'>
            <Title>
                about <span>us</span>
            </Title>
            <Accordion items={faqList} />
        </main>
    );
};

export default About;
