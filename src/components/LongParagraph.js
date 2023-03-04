import { useState } from 'react';
import { cutString } from '../utils/helpers';
import TextButton from './TextButton';

const LongParagraph = ({ str, maxLength = 300, fontSize }) => {
    const [isShowMore, setIsShowMore] = useState(true);
    return (
        <p style={{ fontSize }}>
            {isShowMore ? cutString(str, maxLength) : str}
            {str.length > maxLength && (
                <>
                    {' '}
                    <TextButton onClick={() => setIsShowMore(!isShowMore)}>
                        {isShowMore ? 'show more' : 'show less'}
                    </TextButton>
                </>
            )}
        </p>
    );
};

export default LongParagraph;
