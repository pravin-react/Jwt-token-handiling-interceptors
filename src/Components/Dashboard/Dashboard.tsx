import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import userAxios from '../../Axios/Interceptor';
import './Dashboard.css';


function Dashoboard() {
    
    const navigate = useNavigate();
    const [data,setdata] = useState([]);

    const logout = () =>{
      localStorage.clear();
      navigate('/login')
    }
    const fetchproduct = () =>{
        userAxios
        .get('/auth/products')
        .then((responce) =>{
          console.log(responce.data.data.products);
          setdata(responce.data.data.products);
        })
        .catch((err) => console.error(err.message))
      }
      useEffect(() => console.log('data',data),[data])

return (

<><div>
        <div className="dashboardd">
            <h4>Welcome to Dashboard</h4>
            <button className="getdata" onClick={fetchproduct}>SHOW PRODUCTS</button>
            <button className="logout" onClick={logout}>LOGOUT</button>
        </div>
        <div>
        <br></br>
        {data &&
                data.map(({id,productname,sku,description,price }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{productname}</td>
                    <td>{sku}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                  </tr>
                ))}
        </div>
</div></>

)}


export default Dashoboard