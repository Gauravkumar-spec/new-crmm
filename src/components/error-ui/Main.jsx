const Main = ({ handlerFunc }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-5">
            <svg
                className="w-16 h-16 text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Something went wrong
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Please try again.</p>
            <button
                onClick={async () => await handlerFunc()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Try Again
            </button>
        </div>
    );
};

export default Main;
