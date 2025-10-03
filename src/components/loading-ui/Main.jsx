const Main = ({ message = "" }) => {
    return (
        <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
            <div className="text-center">
                <div className="relative inline-flex">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
                </div>
                <p className="mt-4 text-lg text-blue-500 font-semibold tracking-wider">{message}</p>
            </div>
        </div>
    );
};

export default Main;
