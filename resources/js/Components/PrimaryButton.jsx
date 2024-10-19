export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled ? 'opacity-25' : ''
                } ${className}`
            }
            disabled={disabled}
            style={{ backgroundColor: '#AF2429', borderRadius: '9999px', textAlign: 'center' }} // Added textAlign: 'center'
        >
            {children}
        </button>
    );
}
