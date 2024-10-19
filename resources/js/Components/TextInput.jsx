import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    if (type === 'textarea') {
        return (
            <textarea
                {...props}
                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden ' + className} // Set overflow to hidden
                ref={ref ? ref : inputRef}
            />
        );
    }

    return (
        <input
            {...props}
            type={type}
            className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className}
            ref={ref ? ref : inputRef}
        />
    );
});
