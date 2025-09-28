import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
    Modal,
    ModalBody,
} from "@/base-components";
import { useEffect, useState } from "react";
import { useLeadSearchMutation } from "../../services/leadApi";
import leadImage from "../../assets/images/profile-12.jpg";

import { faker as $f } from "../../pages/PropertyList";
import { useNavigate } from "react-router-dom";

function Main() {
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [leadSearch] = useLeadSearchMutation();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            fetchLead({ search: searchQuery });
        }
        // You can access other properties of the event object, like event.keyCode, event.code, etc.
    };

    const fetchLead = async (data = {}) => {
        setLoading(true);
        const payload = {
            search: null,
            client_id: 1,
            lead_id: null,
            name: "First lead",
            mobile: null,
            email: null,
            budget_min: null,
            budget_max: null,
            preferred_location: null,
            property_type: null,
            status: null,
            assigned_agent: null,
            source: null,
            last_lead_id: null,
            limit: 15,
            sort_by: "created_at",
            sort_order: "DESC",
        };

        const OriginalPayload = { ...payload, ...data };
        console.log(`Original Payload data:-`, OriginalPayload);

        try {
            const response = await leadSearch(OriginalPayload).unwrap();
            console.log(`Response after fetching:-`, response.data);

            setLeads(response.data);
        } catch (error) {
            console.log(`Failed to fetch lead , ${error}`);
            setError("Failed to fetch leads, try again");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLead();
    }, []);

    if (error) {
        console.warn("⚠️ Error UI shown:", error);
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-800/50 text-red-300 px-6 py-4 rounded-xl max-w-md mx-auto backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <button
                        onClick={async () => {
                            console.log("🔄 Retrying fetch...");
                            setError(null);
                            await fetchLead();
                        }}
                        className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        console.log("⏳ Loading agents...");
        return (
            <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative inline-flex">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
                    </div>
                    <p className="mt-4 text-lg text-blue-500 font-semibold tracking-wider">
                        LOADING LEADS
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">Seller Details</h2>
                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                    <button className="btn btn-primary shadow-md mr-2">Print</button>
                    <Dropdown className="ml-auto sm:ml-0">
                        <DropdownToggle className="btn px-2 box">
                            <span className="w-5 h-5 flex items-center justify-center">
                                <Lucide icon="Plus" className="w-4 h-4" />
                            </span>
                        </DropdownToggle>
                        <DropdownMenu className="w-40">
                            <DropdownContent>
                                <DropdownItem>
                                    <Lucide icon="File" className="w-4 h-4 mr-2" /> Export Word
                                </DropdownItem>
                                <DropdownItem>
                                    <Lucide icon="File" className="w-4 h-4 mr-2" /> Export PDF
                                </DropdownItem>
                            </DropdownContent>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {/* BEGIN: Seller Details */}
            <div className="intro-y grid grid-cols-11 gap-5 mt-5">
                <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
                    <div className="box p-5 rounded-md">
                        <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                            <div className="font-medium text-base truncate">User Details</div>
                            <a href="" className="flex items-center ml-auto text-primary">
                                <Lucide icon="Edit" className="w-4 h-4 mr-2" /> More Details
                            </a>
                        </div>
                        <div className="flex items-center">
                            <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                            Unique ID:
                            <a href="" className="underline decoration-dotted ml-1">
                                SLR-20220217-2053411933
                            </a>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="User" className="w-4 h-4 text-slate-500 mr-2" /> Name:
                            <a href="" className="underline decoration-dotted ml-1">
                                {$f()[0].users[0].name}
                            </a>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                            Phone Number: +71828273732
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="MapPin" className="w-4 h-4 text-slate-500 mr-2" />
                            Address: 260 W. Storm Street New York, NY 10025.
                        </div>
                        <div className="flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-full py-1 px-2"
                            >
                                Message User
                            </button>
                        </div>
                    </div>
                    <div className="box p-5 rounded-md mt-5">
                        <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                            <div className="font-medium text-base truncate">Store Details</div>
                            <a href="" className="flex items-center ml-auto text-primary">
                                <Lucide icon="Edit" className="w-4 h-4 mr-2" /> More Details
                            </a>
                        </div>
                        <div className="flex items-center">
                            <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                            Unique ID:
                            <a href="" className="underline decoration-dotted ml-1">
                                STR-2053411933-20220217
                            </a>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="ShoppingBag" className="w-4 h-4 text-slate-500 mr-2" />
                            Name:
                            <a href="" className="underline decoration-dotted ml-1">
                                Themeforest
                            </a>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                            Phone Number: +71828273732
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="MapPin" className="w-4 h-4 text-slate-500 mr-2" />
                            Address: 260 W. Storm Street New York, NY 10025.
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                            Status:
                            <span className="bg-success/20 text-success rounded px-2 ml-1">
                                Active
                            </span>
                        </div>
                        <div className="flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-full py-1 px-2"
                            >
                                Change Status
                            </button>
                        </div>
                    </div>
                    <div className="box p-5 rounded-md mt-5">
                        <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                            <div className="font-medium text-base truncate">
                                Transaction Reports
                            </div>
                            <a href="" className="flex items-center ml-auto text-primary">
                                <Lucide icon="Edit" className="w-4 h-4 mr-2" /> More Details
                            </a>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                            Avg. Daily Transactions:
                            <div className="ml-auto">$1,500.00</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                            Avg. Monthly Transactions:
                            <div className="ml-auto">$42,500.00</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                            Avg. Annually Transactions:
                            <div className="ml-auto">$1,012,500.00</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Star" className="w-4 h-4 text-slate-500 mr-2" /> Average
                            Rating:
                            <div className="ml-auto">4.9+</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Album" className="w-4 h-4 text-slate-500 mr-2" /> Total
                            Products:
                            <div className="ml-auto">7,120</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Archive" className="w-4 h-4 text-slate-500 mr-2" />
                            Total Transactions:
                            <div className="ml-auto">1.512.001</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Lucide icon="Monitor" className="w-4 h-4 text-slate-500 mr-2" />
                            Active Disputes:
                            <div className="ml-auto">1</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
                    <div className="grid grid-cols-12 gap-5">
                        {leads.map((lead) => (
                            <div
                                key={lead?.lead_id}
                                className="intro-y col-span-12 sm:col-span-6 2xl:col-span-4"
                            >
                                <div className="box">
                                    <div className="p-5">
                                        <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                                            <img
                                                alt="Midone - HTML Admin Template"
                                                className="rounded-md"
                                                src={leadImage}
                                            />
                                            <template v-if="faker.trueFalse[0]">
                                                <span className="absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10">
                                                    Featured
                                                </span>
                                            </template>
                                            <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                                                <a href="" className="block font-medium text-base">
                                                    {lead?.name}
                                                </a>
                                                <span className="text-white/90 text-xs mt-3">
                                                    {lead?.email}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-500 mt-5">
                                            <div className="flex items-center">
                                                <Lucide icon="Link" className="w-4 h-4 mr-2" />{" "}
                                                Budget-(max): ${lead?.budget_max}
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <Lucide icon="Layers" className="w-4 h-4 mr-2" />{" "}
                                                Mobile:
                                                {lead?.mobile}
                                            </div>
                                            <div className="flex items-center mt-2">
                                                Status: {lead?.status}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                                        <p
                                            className="flex items-center text-primary mr-auto cursor-pointer"
                                            onClick={() =>
                                                navigate(`/dashboard/lead-preview/${lead?.lead_id}`)
                                            }
                                        >
                                            <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                                        </p>
                                        <a className="flex items-center mr-3" href="#">
                                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                                            Edit
                                        </a>
                                        <a
                                            className="flex items-center text-danger"
                                            href="#"
                                            onClick={() => {
                                                setDeleteConfirmationModal(true);
                                            }}
                                        >
                                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* BEGIN: Pagination */}
                    <div className="intro-y col-span-11 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-6">
                        <nav className="w-full sm:w-auto sm:mr-auto">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <Lucide icon="ChevronLeft" className="w-4 h-4" />
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        ...
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        ...
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <Lucide icon="ChevronRight" className="w-4 h-4" />
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <Lucide icon="ChevronsRight" className="w-4 h-4" />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <select className="w-20 form-select box mt-3 sm:mt-0">
                            <option>10</option>
                            <option>25</option>
                            <option>35</option>
                            <option>50</option>
                        </select>
                    </div>
                    {/* END: Pagination */}
                </div>
            </div>
            {/* END: Seller Details */}
            {/* BEGIN: Delete Confirmation Modal */}
            <Modal
                show={deleteConfirmationModal}
                onHidden={() => {
                    setDeleteConfirmationModal(false);
                }}
            >
                <ModalBody className="p-0">
                    <div className="p-5 text-center">
                        <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
                        <div className="text-3xl mt-5">Are you sure?</div>
                        <div className="text-slate-500 mt-2">
                            Do you really want to delete these records? <br />
                            This process cannot be undone.
                        </div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setDeleteConfirmationModal(false);
                            }}
                            className="btn btn-outline-secondary w-24 mr-1"
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger w-24">
                            Delete
                        </button>
                    </div>
                </ModalBody>
            </Modal>
            {/* END: Delete Confirmation Modal */}
        </>
    );
}

export default Main;
