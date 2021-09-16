import React from 'react';
import { createPortal } from 'react-dom'
import RoomForm from './RoomForm';
const backdropStyle= {
  position: "fixed",
  display:'flex',
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  zIndex: 45,
  background: "rgba(10, 5, 5, 0.50)"
}
const ModalBackdrop = (props) => {
  return <div onClick={props.onClose} style={backdropStyle} />;
};

const Modal = (props) => {
  return (
    <>
     {createPortal(
       <ModalBackdrop />,
       document.getElementById('backdrop')
     )}
     {createPortal(
       <RoomForm onAddRoom={props.onAddRoom} />,
       document.getElementById('modal')
     )}
    </>
  )
}

export default Modal
