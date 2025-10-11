import { useEffect, useState } from "react";
import { dashboardApi } from "../../../api/dashboardApi.js";
import LoadingUI from "../../../components/loading-ui/Main.jsx";
import ErrorUI from "../../../components/error-ui/Main.jsx";

const ActivityLog = () => {
    const [activityLog, setActivityLog] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchActivityLog = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                client_id: 1,
                limit: 5,
            };

            const response = await dashboardApi.dashboardActivitylog(payload);

            if (response) {
                setActivityLog(response);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivityLog();
    }, []);

    if (loading) {
        return <LoadingUI message="Loading Activity Logs" />;
    }

    if (error) {
        return <ErrorUI handlerFunc={fetchActivityLog} />;
    }

    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">Activity Logs</h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">AGENT NAME</th>
                                <th className="text-center whitespace-nowrap">ACTION</th>
                                <th className="text-center whitespace-nowrap">MODULE</th>
                                <th className="text-center whitespace-nowrap">DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityLog &&
                                activityLog.map((logs) => (
                                    <tr key={logs?.log_id} className="intro-x">
                                        <td>
                                            <a href="" className="font-medium whitespace-nowrap">
                                                {logs?.agent_id}
                                            </a>
                                        </td>
                                        <td className="text-center">{logs?.action}</td>
                                        <td className="text-center">{logs?.module}</td>
                                        <td className="text-center">{logs?.created_at}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityLog;
