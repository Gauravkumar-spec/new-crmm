import { Lucide, Tippy } from "@/base-components";
import { PulseLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../../api/dashboardApi.js";

const TotalProperty = () => {
    const [totalPropertyCount, setTotalPropertyCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTotalProperty = async () => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                client_id: 1,
            };

            const response = await dashboardApi.getPropertyCount(payload);

            if (response) {
                setTotalPropertyCount(response?.property_summary[0]?.property_count);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTotalProperty();
    }, []);

    return (
        <div className="box p-5">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house report-box__icon text-primary"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <div className="ml-auto">
                    <Tippy
                        tag="div"
                        className="report-box__indicator bg-success cursor-pointer"
                        content="33% Higher than last month"
                    >
                        33%
                        <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                </div>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6">
                {error ? (
                    <p className="text-sm text-slate-500 mt-1">404 Not Found</p>
                ) : (
                    <>
                        {!error && loading ? (
                            <PulseLoader color="#270038" size={7} />
                        ) : (
                            totalPropertyCount
                        )}
                    </>
                )}
            </div>
            <div className="text-base text-slate-500 mt-1">Total Property</div>
        </div>
    );
};

export default TotalProperty;
