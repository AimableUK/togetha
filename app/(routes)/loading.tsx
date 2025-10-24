import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex gap-1 items-center">
        <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
        <h3 className="font-bold text-2xl">Togetha</h3>
      </div>
      <div className="loader1"></div>
    </div>
  );
};

export default loading;
