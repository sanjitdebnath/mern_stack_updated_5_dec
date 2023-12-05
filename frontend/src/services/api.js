const api =  {
    fetchData : async () => {
        try {
          const response = await fetch('http://localhost:3000/fetch_user');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const result = await response.json();
          let obj = result.data;
  
          let res = [];
          obj.forEach(element => {
            res.push(element)
          });
          return res;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },

       InsertData : async (Data) => {
        console.log(Data);
        try {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
          };
      
          const response = await fetch('http://localhost:3000/insert_user',options);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const result = await response.json();
          if(result.status === "ok")
          {
            return true;
          }
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },

      updateData : async (data) => {
        console.log(data)
        try {
          const requestData = {
            id : data.id,
            body : data
          };
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          };
          const response = await fetch('http://localhost:3000/update_user',options);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const result = await response.json();
          console.log(result);
          await api.fetchData();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },

     fetchSingleData : async (id) => {
        try {
          const requestData = {
              val : id
          };
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          };
      
    
          const response = await fetch('http://localhost:3000/fetch_single_user',options);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const result = await response.json();
    
          return result;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },

        deleteData : async (id)=>
        {
            try {
            const requestData = {
                id : id
            };
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            };
            const response = await fetch('http://localhost:3000/delete_user',options);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await response.json();

            if(result.message === "success")
            {
                return true;
            }

            } catch (error) {
            console.error('Error fetching data:', error);
            }
        }
}

export default api;