import FormField from './FormField';

const ImagesFilter = ({ allTypes, type, images, dispatch }) => {
    return (
        <div style={{ maxWidth: '15rem', marginBottom: '2rem' }}>
            <FormField
                name='types'
                value={type}
                onChange={(e) => dispatch({ type: 'SWITCH_TYPE', payload: e.target.value })}
            >
                {allTypes.map((item, index) => (
                    <option key={index} value={item}>
                        {item[0].toUpperCase() + item.slice(1)} ({images[item].length})
                    </option>
                ))}
            </FormField>
        </div>
    );
};

export default ImagesFilter;
