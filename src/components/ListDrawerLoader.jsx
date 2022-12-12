import React from 'react'
import ReactLoading from "react-loading"

export default function ListDrawerLoader() {
    return (
        <div ref={(n) => {if(n) n.style.setProperty('display', 'flex', 'important')}} style={{width: '100%', justifyContent: 'center', display: 'flex !important'}}>
          <ReactLoading type={"cylon"} color="#fff" width={32} height={32}/>
        </div>
    )
}