import axios from "axios";
import { useState,  useEffect } from "react";
import { Get } from "./Axiosoperations";
import url from "../Images/stockphoto.jpg"
import { productProps } from "./Types";
import { User } from "./Types";
import { API } from "../controller/api";
import ReactPaginate from "react-paginate"
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from "react-toastify";
//import { loginContext, userContext } from "./usecontext";
import { useNavigate,Link } from "react-router-dom";

//toast.configure();
export const Productpage = () => {
  const navigate = useNavigate();
  const [totalpages,settotalpages]=useState(0)
  const [responsedata, setresponsedata] = useState<productProps[] | null>(null);
  const noItems= 5;

  const getpages=async(currentpage : number)=>{
    try{
      const response=await API.get(`item/${currentpage}/${noItems}`);
      return response.data.content;
    }
    catch(err){
      console.log(err);
    }
  }
  const handlePageClick=async(data : {
    selected: number;
})=>{
    
  const pages= await getpages(data.selected)
  setresponsedata(pages)
    console.log(data.selected + 1);
}

  const getresponse = async () => {
    try{
      const response = await API.get(
        "item/0/5"
      );
      setresponsedata(response.data.content);
      settotalpages(response.data.totalPages)
    }catch(err){
      console.log(err);
    }

    
    
    
    
    
    // console.log(responsedata);
  };
  
  const [data,setdata]=useState<User| null>(null)
  //const logg=useContext(loginContext) 
  useEffect(()=>{
     const user=window.localStorage.getItem("Data")
    if(user){
   setdata(JSON.parse(user))
   
     }
     
     
  },[]) 
  
  
  

  
  //console.log(token)

 

  const postdata = async (id: number) => {
    try {
      const response = await API.post(
        `https://furnland.productkitchen.tech/item/itemSelect/${id}`,
        {},
      
      );
      //alert("Item successfully added")
      toast.success("Item added")
      console.log(response);
    } catch (error) {
      if(error){
        toast.warning("Error")
      }
    }
  };
  useEffect(() => {
    getresponse()
  }, []);

  return (
    <>
    
    <div  className="bg-light">
      <div className="container pt-5">
        <div className="row gy-0">
          {responsedata ? (
            responsedata.map((element) => (
              <>
              
              <div className="col-6 col-lg-3 " key={element.id}>
              {/* <Link className="text-decoration-none" to={`/products/${element.id}`}> */}
                <div style={{ height: "400px" }}>
                  <a className="text-decoration-none" href={`products/${element.id}`} >
                  <div className="h-50" style={{background:`linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0, 0.7)) , url(${url}) center `}}></div>
                  <div className="row">
                    <div className="col-12">
                      <span className="text-dark">{element.itemName.toUpperCase()}</span>
                    </div>
                    <div className="col-12">
                      <span className="text-dark"># {element.itemPrice}</span>
                    </div>
                    <div className="col-12">
                      <span className="text-muted">
                        {element.itemDescription}
                      </span>
                    </div>
                    </div>
                    </a>
                    <div className="row">
                    <div className="col-12 pt-4">
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={async () => {
                           
                            data
                            ? await postdata(element.id)
                              : navigate("/login");
                          }}
                          style={{ backgroundColor: "#F66B0E" }}
                          className="w-50 text-white btn btn"
                        >
                          Add to cart
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
             
              </>
            ))
            ) : (
              <div className="text-center mt-5"><Spinner animation="border"/></div>
          )
          }

        </div>
      </div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={totalpages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center pb-5 mt-5"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        />
    </div>

   
    </>
  );
};
