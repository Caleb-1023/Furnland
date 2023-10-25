
import { styleProps } from "./Types";
import Images from "../Images/stockphoto.jpg"

//const image= new URL("../Images/istockphoto-1293762741-170667a.jpg",import.meta.url)

export let Styleprops:styleProps

Styleprops={
    style:{
        textDecoration:"none"
},
style2:{
    
    paddingBottom:"10px",
    width: "100%",
    background:`linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0, 0.7)) , url(${Images}) center / cover fixed `
    
},

style3:{
   background: "white"
   
},
// style4:{
//     height:"90vh",
// }
buttonstyle:{
    backgroundColor:"#F66B0E" ,
    borderRadius:"0px",
    border:0
    
    
},

buttonstyle2:{
    backgroundColor:"#F66B0E",
    width: "150px",
    
    
    
    
}



}