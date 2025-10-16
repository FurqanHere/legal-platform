import React, { useEffect, useState } from 'react';
import Loader from "../../components/Loader"; 
import ApiService from "../../services/ApiService";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link , useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "../../utils/helper";


const List = () => {
    
    const [isLoader, setIsLoader] = useState(false);
    const [currency] = useState(process.env.REACT_APP_CURRENCY);
    const [business_types, setBusinessTypes] = useState([]);
    const [pagination, setPagination] = useState({});
    const [apiData, setApiData] = useState({
        search: "",
        daterange: "",
        page: 1,
    });
   
    
    useEffect(() => {
        getBusinessTypes();
    }, [apiData.page, apiData.search, apiData.daterange,]); // Dependency array for re-fetching data

    const getBusinessTypes = async () => {
        try {
            setIsLoader(true);
            const response = await ApiService.request({
                method: "GET",
                url: "business_types", // Replace with your API endpoint
                data: apiData
            });
            const data = response.data;
            if (data.status) {
                setBusinessTypes(data.data);
                setPagination(data.pagination);
            } else {
                toast.error(data.message);
            }
            setIsLoader(false);
        } catch (error) {
            setIsLoader(false);
        }
       
    };

    const handlePageChange = (event) => {
        setApiData(prev => ({ ...prev, page: event }));
    };

    const clearFilter = () => {
        setApiData({
            search: '',
            daterange: '',
            page: 1
        });
    };

    const delData = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'you will not be able to revert it!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '#9E9B9B',
            cancelButtonText: 'No',
        });

        if (result.isConfirmed) {
            const response = await ApiService.request({
                method: "DELETE",
                url: `business_types/${id}`, // Replace with your API endpoint
            });
            const data = response.data;
            if (data.status) {
                getBusinessTypes();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        }
    };

 

    const updateStatus = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "you want to change its status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4BC95F',
            confirmButtonText: 'Yes',
            cancelButtonColor: '#9E9B9B',
            cancelButtonText: 'No',
        });

        if (result.isConfirmed) {
            const response = await ApiService.request({
                method: "POST",
                url: `business_types/status/${id}`, // Replace with your API endpoint
            });
            const data = response.data;
            if (data.status) {
                getBusinessTypes();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        }
    };

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 text-capitalize">
                           Business Types</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <Link to="/dashboard" className="text-muted text-hover-primary">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-400 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-muted">Business Types</li>
                        </ul>
                    </div>
                    <div className="d-flex align-business_types-center gap-2 gap-lg-3">
                        {/* Add New business_types Button */}
                        <Link to={`/business_types/create`}  className='btn btn-base btn-sm'>{("Add New Business Type")}</Link>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card">
                        <div className="card-header border-0 pt-6">
                            <div className="w-100">
                                <form method="get">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex align-business_types-center position-relative my-1">
                                                <input type="text" value={apiData.search} onChange={e => setApiData({ ...apiData, search: e.target.value })} className="form-control form-control-solid me-5"
                                                 placeholder={("Search BusinessType title..")} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <DatePicker
                                                selectsRange={true}
                                                startDate={apiData.daterange[0]}
                                                endDate={apiData.daterange[1]}
                                                onChange={e => setApiData({ ...apiData, daterange: e })} 
                                                isClearable={true}
                                                className='form-control form-control-solid'
                                                placeholderText={('Select Daterange')}
                                            />
                                        </div>
                                        <div className="col-md-3 mt-2">
                                            <button type="button" onClick={clearFilter} className={`btn btn-sm btn-secondary mx-1 ${!apiData.search && !apiData.daterange ? 'd-none' : ''}`}>{("clear")}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <div id="kt_business_types_table_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                <div className="table-responsive">
                                    <table className="table align-middle table-hover fs-6 gy-5 dataTable no-footer">
                                        <thead>
                                            <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                                {/* <th>Icon</th> */}
                                                <th>Title</th>
                                                <th>Created Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="fw-semibold text-gray-600 fs-6">
                                            {business_types.length > 0 ? business_types.map((cat, index) => (
                                                <tr key={index}>
                                                    {/* <td>
                                                        <img src={cat.image} alt="image" className="w-50px h-50px object-cover" />
                                                    </td> */}
                                                    <td>{cat.title}</td>
                                                    <td> {formatDate(cat.createdAt,'DD MMM YYYY, hh:mm A')} </td>
                                                    <td>
                                                        <button className="p-0 btn btn-transparent">
                                                            <span className={`badge ${cat.status  ? 'badge-light-success' : 'badge-light-danger'}`} onClick={() => updateStatus(cat._id)} >
                                                                {cat.status  ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </button>
                                                    </td>
                                                    <td className="mt-2">
                                                        <Link to={`/business_types/create/${cat._id}`} className="btn btn-sm h-35px btn-light-primary">
                                                            <i className="bi bi-pencil-fill fs-6"></i>
                                                        </Link>
                                                        <button  onClick={() => delData(cat._id)} className="btn btn-sm h-35px btn-light-primary">
                                                            <i className="bi bi-trash-fill fs-6"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="11" className="text-dark text-center mt-2"> No data found!!</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table> 
                                    {isLoader && (
                                        <Loader text="Loading" size="30" className="text-center"  />
                                    )}
                                    <span>Total Records: {pagination?.total_records}</span>


                                    {/* {pagination.total_pages > 1 && (
                                        <Paginator
                                            page={pagination.current_page}
                                            rows={pagination.per_page}
                                            totalRecords={pagination.total_records}
                                            onPageChange={handlePageChange}
                                        />
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
