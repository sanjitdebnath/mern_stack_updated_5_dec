import React, {useRef,useState} from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import ColorAlerts from './toast/Alert'



const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  width : 100%;
`;

const btn = {
    height : "40px",
    width : "100px",
    marginTop : "10px"
  };
  

export default function InsertData({InsertData,navigationAction}) {
    const FormBox = styled('div')`
    min-width : 35%;
    width : 350px;
    display : flex;
    flex-direction : column;
    box-shadow: 1px 1px 10px rgba(255, 90, 0, 0.1);
    padding: 20px;
    `;

    let nameRef = useRef(null);
    let ageRef = useRef(null);
    let emailRef = useRef(null);

    const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [AgeErrorMessage, setAgeErrorMessage] = useState('');


  const [statusForAlert, setstatusForAlert] = useState('');
  const [alertMessage, setalertMessage] = useState('');
  const [alertColor, setalertColor] = useState('');


    const validateInputs = () => {
        let isValid = true;
    
        // Validate Name
        if (!nameRef.current.value.trim()) {
          setNameError(true);
          isValid = false;
        } else {
          setNameError(false);
        }

        // Validate Age
        if (!ageRef.current.value.trim()) {
            setAgeError(true);
            setAgeErrorMessage('Age is required');
            isValid = false;
        } else {
            const isNumeric = /^\d+$/.test(ageRef.current.value.trim());
            if (!isNumeric) {
                setAgeErrorMessage('only numeric value')
                setAgeError(true);
                isValid = false;
            }
            else{
                setAgeError(false);
            }
        }
  
        // Validate Email
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailRef.current.value.trim() || !emailPattern.test(emailRef.current.value)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }
  
      return isValid;

    }

    
    let Insert_data = ()=>
    {
        if(validateInputs()){
            let data = {
                name : nameRef.current.value,
                age : ageRef.current.value,
                email : emailRef.current.value
            }
            InsertData(data);
        }
        else{
            console.log("invalid data")
            setstatusForAlert("error")
            setalertMessage("Invalid data");
            setalertColor("error");
        }
    }
  return (
    <>
    <div className="container mt-5 w-50">
        <ColorAlerts status={statusForAlert} message={alertMessage} color={alertColor}/>
    </div>
    <div className="container d-flex justify-content-center align-items-center flex-column mt-5">
      <h1 className="mb-5">Data Insert</h1>
    <FormBox>
      <StyledTextField
        id="outlined-basic-name"
        label="Name"
        variant="outlined"
        inputRef={nameRef}
        error={nameError}
        helperText={nameError ? 'Name is required' : ''}
      />
     <StyledTextField 
        id="outlined-basic-age"
        label="Age"
        variant="outlined"
        inputRef={ageRef}
        error={ageError}
        helperText={ageError ? AgeErrorMessage : ''}
        />
      <StyledTextField 
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        inputRef={emailRef}
        error={emailError}
        helperText={emailError ? 'Please enter a valid email' : ''}
        />
        <Button sx={btn} onClick={Insert_data} variant="contained" color='success' className="btn btn-success">Add</Button>
    </FormBox>

    <div className="mt-5">
    <Button variant="outlined" size="small" onClick={ () => navigationAction(true)} >Show Table Data</Button>
      </div>
    </div>
    </>
  );
}