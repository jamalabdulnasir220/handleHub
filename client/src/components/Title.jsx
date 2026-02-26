import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="font-bold text-2xl text-gray-800">{title}</h3>
      <p className="font-normal text-[16px] text-slate-600 max-w-125">{description} </p>
    </div>
  );
};

export default Title;

