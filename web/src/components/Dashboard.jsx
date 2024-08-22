import React, { useEffect, useState } from 'react';
import api from "../api.js";
import { Table, Card } from 'flowbite-react';
import CustomBrushChart from './CustomBrushChart';
import ActivityHeatmap from "./ActivityHeatmap";
import StatsPerWeekday from "./StatsPerWeekday";
import DistanceBreakdown from './DistanceBreakdown';
import Trivia from './Trivia';
import RecentActivities from "./RecentActivities.jsx";
import Summary from "./Summary.jsx";


const Dashboard = () => {


  return (
      <>
          <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/5 p-1" style={{minWidth: '400px'}}>
                  <Card className="h-full">
                      <RecentActivities />
                  </Card>
              </div>
              <div className="w-full md:w-2/5 p-1">
                  <Card className="h-full flex flex-col justify-start">
                    <Summary />
                  </Card>
              </div>
          </div>
          <div className="flex">
              <div className="w-full p-1">
                  <Card className="h-full flex flex-col justify-start">
                      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          Weekly distances
                      </h5>
                      <div className="flex-grow">
                          <CustomBrushChart/>
                      </div>
                  </Card>
              </div>
          </div>
          <div className="flex">
              <div className="w-full p-1">
                  <Card className="h-full flex flex-col justify-start">
                  <div className="flex-grow">
                          <ActivityHeatmap/>
                      </div>
                  </Card>
              </div>
          </div>
          <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-1" style={{minWidth: '400px'}}>
                  <Card className="h-full">
                      <StatsPerWeekday/>
                  </Card>
              </div>
              <div className="w-full md:w-1/2 p-1">
                  <Card className="h-full">
                      <StatsPerWeekday/>
                  </Card>
              </div>
          </div>
          <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-1" style={{minWidth: '400px'}}>
                  <Card className="h-full">
                      <DistanceBreakdown />
                  </Card>
              </div>
              <div className="w-full md:w-1/2 p-1">
                  <Card className="h-full">
                      <Trivia />
                  </Card>
              </div>
          </div>
      </>
  );
}

export default Dashboard;
