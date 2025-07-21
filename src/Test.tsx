import { useEffect, useState } from "react"

function Test() {
    const [count,setCount] = useState(10);
    const [c1,setC1] = useState(0);
    useEffect(()=>{
        switch (c1){
        case 2:
            console.log("ok")
            break;
        case 3:
            console.log("I'm")
            break;
        default:
            console.log("fine")
        }

    },[c1])
  return (
    <>
        <div onClick={()=>setCount(count + 1)} className="ok">
        <p>{count}</p>
        </div>
        <button onClick={()=>setC1(c1 + 2)} className="p-4 bg-sky-300 text-white">Click me</button>
        <span className="mt-2">{c1}</span>
    </>
  
)
}

export default Test
