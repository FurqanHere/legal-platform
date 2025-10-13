import React, { useState, useEffect, useRef } from 'react';
import socketService from '../services/SocketService';
import audioFile from '../assets/new-order.mp3';
import orderImg from '../assets/images/new-order.jpg'; 
import {  useNavigate} from 'react-router-dom';

const SocketIOPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [orderHeading, setOrderHeading] = useState('');
  const [orderText, setOrderText] = useState('');
  const [order, setOrder] = useState([]);
  const audioRef = useRef(null);
  const branch = JSON.parse(localStorage.getItem('branch'));

  const navigate = useNavigate();
  
  useEffect(() => {
    initializeAudio();
    initializeSocket();

    // Cleanup function
    return () => {
      if (socketService.socket) {
        socketService.socket.off('newOrder');
      }
    };
  }, []);

  const initializeSocket = () => {
      
      socketService.socket.on('newOrder', (data) => {
            setOrder(data);
            setOrderHeading(`New Order #${data.order_code}`);
            setOrderText(`Order #${data.order_code} on Branch ${data?.branch?.name}`);
            setShowPopup(true);
            playSound();
      });
  };

  const initializeAudio = () => {
    audioRef.current = new Audio(audioFile);
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const closePopup = () => {
    navigate('/orders/'+order._id);
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div>
          <div className="backdrop"></div>
          <div 
            className="modal fade show" 
            id="exampleModalLive" 
            tabIndex="-1" 
            aria-labelledby="exampleModalLiveLabel" 
            aria-modal="true" 
            role="dialog" 
            style={{ display: 'block' }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="p-5 text-center">
                    <img 
                      src={orderImg} 
                      alt="new_order" 
                      width="200" 
                    />
                    <h4>{orderHeading}</h4>
                    <p>{orderText}</p>
                    <div className="text-center">
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal" 
                        onClick={closePopup}
                      >
                        Okay!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocketIOPopup;