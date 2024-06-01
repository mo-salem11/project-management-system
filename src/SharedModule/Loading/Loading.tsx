import React from 'react'
import {  ThreeDots, Watch } from 'react-loader-spinner'

interface LoadingProps {
  components: boolean;
}
const Loading:React.FC<LoadingProps>=({components})=> {
  return (
    <>
   {   components?
  <div className=" loader mx-auto">
  <Watch
  visible={true}
  height="120"
  width="120"
  radius="48"
  color="#0e382f"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
</div>
:
  <div className=" loader mx-auto">
    <ThreeDots
        visible={true}
        height="35"
        width="35"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
</div> }
    </>
  )
}

export default Loading