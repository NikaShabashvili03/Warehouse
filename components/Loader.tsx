'use client';

import { Circles } from "react-loader-spinner";

const Loader = ({
    size
}: {
    size?: string
}) => {
  return ( 
    <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <Circles
        height={size || "80"}
        width={size || "80"}
        color="#459bb6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
   );
}
 
export default Loader;