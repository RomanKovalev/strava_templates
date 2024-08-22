import React from 'react';
import { useSelector } from "react-redux";

const Summary = () => {
  const summary = useSelector((state) => state.dashboard.summary);

  return (
      <div className="flex-grow">
          { summary }
      </div>
  );
};

export default Summary;
