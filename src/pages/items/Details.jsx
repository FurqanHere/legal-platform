import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import ApiService from '../../services/ApiService';
import {formatDate} from '../../utils/helper.js';

const ItemDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useState(false);
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [tab, setTab] = useState("info");
  const [item, setItem] = useState([]);
  const [timings, setTiming] = useState(null);
 

  useEffect(() => {
    if (id) {
      getSingleData();
    }
  }, [id]);

  const getSingleData = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: 'GET',
        url: `items/${id}`,
        data: {get_for:'details'}
      });
      const data = response.data;
      if (data.status) {
        const item = data.data;
        setItem(item);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
    }
  };



 
  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-xxl d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              Item: {item?.name}
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <a href="/dashboard" className="text-muted text-hover-primary">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                <a href="/items" className="text-muted text-hover-primary">
                  Itemes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="app-container container-xxl">
          <div className="card">
            <div className="card-body pt-5">

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button  className={`nav-link fs-6 px-5 ${tab === "info" ? "active" : ""}`}
                            onClick={() => setTab("info")}
                     type="button"> <i className="bi bi-building-fill fs-5"></i> Item Info</button>
                  </li>
                  {/* <li class="nav-item" role="presentation">
                    <button className={`nav-link fs-6 px-5 ${tab === "addons" ? "active" : ""}`}
                            onClick={() => setTab("addons")}
                      type="button" ><i className="bi bi-clock-fill fs-5"></i> Addons</button>
                  </li> */}

              

                 
                </ul>

                {!isLoader && 
                  <div class="tab-content" id="myTabContent">
                    {tab === "info" && (
                      <div class="tab-pane fade show active" >
                        <div className="table-responsive mt-5 w-lg-75">
                          <table className="table align-middle table-striped bitem fs-6">
                            <tbody>
                              <tr>
                                <th className="px-3 fw-semibold">Picture</th>
                                <th>
                                  {item.image && 
                                      <img src={item.image} alt="picture" className="w-70px h-70px object-cover rounded" />
                                  }
                                </th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold">Item Name</th>
                                <th>{item?.title}</th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold"> Name Arabic</th>
                                <th>{item?.title_ar}</th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold">Price</th>
                                <td> 
                                  {item.discounted_price ?(
                                        <div>
                                            <strike className="text-danger">{currency}  {item.original_price}</strike> <br />
                                            <span>{currency}  {item.discounted_price}</span>
                                        </div>
                                    ):(
                                        <span>{currency}  {item.original_price}</span>
                                    )}
                                </td>
                              </tr>
                               <tr>
                                <th className="px-3 fw-semibold"> Categories</th>
                                <th>
                                  {item.categories && item?.categories.map((category, index) => (
                                    <span className="badge bg-base m-1"  key={index}>{category.title}</span>
                                  ))}
                                </th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold"> Addons</th>
                                <th>
                                  {item.addons && item?.addons.map((addon, index) => (
                                    <span className="badge bg-base m-1"  key={index}>{addon.title}</span>
                                  ))}
                                </th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold"> Description</th>
                                <th>{item?.description}</th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold"> Description Arabic</th>
                                <th>{item?.description_ar}</th>
                              </tr>
                              <tr>
                                <th className="px-3 fw-semibold"> DateTime</th>
                                <td>{formatDate(item?.createdAt,'DD MMM, hh:mm A')} </td>
                              </tr>
                            
                            
                            </tbody>
                          
                          </table>
                        </div>
                      </div>
                    )}
                    {tab === "addons" && (
                      <div class="tab-pane fade show active">
                        <div className="table-responsive mt-5 w-lg-75">
                          <table className="table align-middle table-striped bitem fs-6">
                            <tbody>
                              <tr>
                                <th className="px-3 fw-semibold">Day</th>
                                <th className="px-3 fw-semibold">Open Time</th>
                                <th className="px-3 fw-semibold">Close Time</th>
                                <th className="px-3 fw-semibold">Is Off</th>
                              </tr>
                              {timings  ? timings.map((item, index) => (
                                <tr key={index}>
                                 

                                  <td>{item.day ?? '--'}</td>
                                  <td>{item.open ?? '--'}</td>
                                  <td>{item.close ?? '--'}</td>
                                  <td>{item.is_off?'Yes':'No'}</td>
                                </tr>
                              )) : (
                                  <tr>
                                      <td colSpan="6" className="text-dark text-center mt-2">No data found!</td>
                                  </tr>
                              )}

                             
                            </tbody>
                          
                          </table>
                        </div>
                      </div>
                    )}

                  </div>
                }
                {isLoader && 
                  <Loader color="black" className="mt-5" text="Loading" size="30" />
                }
             
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
