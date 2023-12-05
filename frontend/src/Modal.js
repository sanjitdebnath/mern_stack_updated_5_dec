import React,{useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputFiled from './InputFiled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius : "10px",
  boxShadow: 24,
  p: 4,
};
const btn = {
  float : "right",
  marginTop : "20px",
  marginRight : "7px",
  width : "100px",
};



export default function MyModal(props) {
  let {openModal,action,FiledData,updateDataGet} = props;   
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);

  const calledData = () => {
    if (nameRef.current && ageRef.current && emailRef.current) {
      const id = idRef.current.getFieldValue();
      const name = nameRef.current.getFieldValue();
      const age = ageRef.current.getFieldValue();
      const email = emailRef.current.getFieldValue();

      let Fielddata = 
      {
        id,
        name,
        age,
        email
      }
      updateDataGet(Fielddata)
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={action}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputFiled data={FiledData.id} ref={idRef} type="hidden"/>
          <InputFiled data={FiledData.name} ref={nameRef}/>
          <InputFiled data={FiledData.age} ref={ageRef}/>
          <InputFiled data={FiledData.email} ref={emailRef}/>
          <Button variant="contained" color='success' sx={btn} onClick={() => calledData()} className="btn btn-success">Update</Button>
        </Box>
      </Modal>
    </div>
  );
}

