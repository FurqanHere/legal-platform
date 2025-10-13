// components/TimingModal.js
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import ApiService from '../services/ApiService';

const TimingModal = ({ branchId, closeModal }) => {

    const [formData, setFormData] = useState({
        open_time: '',
        close_time: '',
        branch_id:branchId,
    });
    const [isLoader, setIsLoader] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoader(true);
    
        try {
         
    
          const response = await ApiService.request({
            method: 'POST',
            url: `branches/updateTimings/${branchId || ''}`, // Replace with your API endpoint
            data:formData,
          });
    
          if (response.data.status) {
            toast.success(response.data.message);
            closeModal();
          } else {
            toast.error(response.data.message);
          }
          setIsLoader(false);
        } catch (error) {
          console.error('Form submission failed:', error);
        } finally {
          setIsLoader(false);
        }
      };
     

    return (
        <div>
            <div className="backdrop"></div>
            <div
                className="modal fade show" style={{ display: 'block',}}
                id="exampleModalLive"
                tabindex="-1"
                aria-labelledby="exampleModalLiveLabel"
                aria-modal="true"
                role="dialog"
            >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h4>Apply Same Timing for All Days</h4>
                </div>

                <form onSubmit={handleSubmit} method="post" >
                    <div className="modal-body">
                        <h6 className="text-center">Select Open and Close Time</h6>

                        <div className="row">
                            <div className="col-md-6 my-3">
                                <label for="" className="required">Open Time </label>
                                <input
                                    type="time"
                                    name={`open_time`}
                                    value={formData.open_time}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setFormData({ ...formData, open_time: e.target.value })}
                                  />
                            </div>
                            <div className="col-md-6 my-3">
                                <label for="" className="required">Close Time </label>
                                <input
                                    type="time"
                                    name={`close_time`}
                                    value={formData.close_time}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setFormData({ ...formData, close_time: e.target.value })}
                                  />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={closeModal} className="btn btn-light me-3"
                        >Close</button>
                        <button duration="submit" className="btn btn-base" disabled={isLoader}>
                            <span className="indicator-label">{isLoader ? <Loader size="20" color="white" text="Submitting" /> : ('submit')}</span>
                        </button>
                    </div>
                </form>

                </div>
            </div>
            </div>
        </div>
    );
};



export default TimingModal;
