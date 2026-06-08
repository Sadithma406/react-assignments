import { useState } from "react";

function Assignment5(){
    const [num,setNum] =useState();
    const [array,setArray] =useState([]);
    return(
        <div id="ass5">
        <button onClick={()=>setArray([...array].sort((a,b)=>a-b))}>Sort Ascending</button>&nbsp;&nbsp;
        <button onClick={()=>setArray([...array].sort((a,b)=>b-a))}>Sort Descending</button>
        <ul>
            {array.map((item,index)=>
            <li key={index}>{item} &nbsp;&nbsp;&nbsp; 
            <button 
            onClick={()=>setArray(array.filter((item,i)=>i!==index))}>
                Remove
            </button>&nbsp;&nbsp;&nbsp;
            <button onClick={()=>{
                if(index>0){
                    let prev = array[index-1];
                    let newArray =[...array];
                    newArray[index-1]=item;
                    newArray[index]=prev;
                    setArray(newArray);
                }
            }}>Move up</button>
            <button onClick={()=>{
                if(index!=array.length-1){
                    let next = array[index+1];
                    let newArray = [...array];
                    newArray[index] = next;
                    newArray[index+1]=item;
                    setArray(newArray);
                }
            }}>Move Down</button>
            </li>)
            }
        </ul>
        <label>Enter the number:   </label>
            <input type="number" onChange={(e)=>setNum(e.target.value)}></input>
                <button onClick={()=>{
                    if(num!=null){
                        setArray([...array,num])
                    }
                }}>Add</button>
        </div>
    )
}
export default Assignment5;