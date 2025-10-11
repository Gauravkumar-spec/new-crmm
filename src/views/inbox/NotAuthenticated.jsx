import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../stores/slices/appSlice.js";

export default function NotAuthenticated() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    return (
        <div className="flex pt-20 justify-center items-center dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Welcome
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    To get started, please sign in with your Microsoft account.
                </p>
                <button
                    onClick={() => dispatch(signIn())}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    You need an account to access your dashboard and start coding challenges.
                </p>
            </div>
        </div>
    );
}
