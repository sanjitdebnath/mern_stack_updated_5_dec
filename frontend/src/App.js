import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';
import InsertData from './components/InsertData';
import api from './services/api';
import ShowTabledata from './components/ShowTabledata';

function App() {
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filedData, filedDataSet] = useState({});
  const [showSecondComponent, setShowSecondComponent] = useState(false);



  const fetchDataFromApi = async () => {
    setData(await api.fetchData());
  };
  
  const InsertDataIntoApi = async (Data) => {
    let res = await api.InsertData(Data);
    if(res)
    {
      fetchDataFromApi();
      setShowSecondComponent(true);
    }
  };
  
  const updateDataIntoApi = async (data) => {
    await api.updateData(data);
    fetchDataFromApi();
    handleClose();
  };
  
  const DeleteDataFromApi = async (id) => {
    let res = await api.deleteData(id);
    if(res)
    {
      fetchDataFromApi();
    }
  };
  
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  
  const handleOpen = async (_id) => 
  {
    const res = await api.fetchSingleData(_id);
    setOpenModal(true);
    let data = {
      id : res.data._id,
      name : res.data.name,
      age : res.data.age,
      email : res.data.email
    }
    filedDataSet(data);
  }
  const handleClose = () => setOpenModal(false);

  const navigation = (action) =>  setShowSecondComponent(action);

  return (
    <>
    <Modal openModal={openModal} action={handleClose} FiledData={filedData} updateDataGet={updateDataIntoApi}/>
    {!showSecondComponent && <InsertData InsertData={InsertDataIntoApi} navigationAction={navigation}/>} 
    {showSecondComponent && <ShowTabledata data={data} handleOpen={handleOpen} DeleteDataFromApi={DeleteDataFromApi} navigationAction={navigation} />} 
    
    </>
  );
}

export default App;
