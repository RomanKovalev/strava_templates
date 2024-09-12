import React from 'react';
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const RecentActivities = () => {

  const recentActivities = useSelector((state) => state.dashboard.recentActivities);

  return (
      <div>
          <div className="w-1/1 flex flex-row justify-between align-items-center mb-5 mt-0">
              <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Most recent activities
              </h5>
              <h3>
                <Link to='/activities' className="text-blue-600 hover:underline cursor-pointer">
                    View All
                </Link>
              </h3>
          </div>
          <Table>
              <Table.Head>
                  <Table.HeadCell className="py-2">Date</Table.HeadCell>
                  <Table.HeadCell className="py-2">Name</Table.HeadCell>
                  <Table.HeadCell className="py-2">Type</Table.HeadCell>
                  <Table.HeadCell className="py-2">Distance</Table.HeadCell>
                  <Table.HeadCell className="py-2">Moving time</Table.HeadCell>
                  <Table.HeadCell className="py-2">Elevation</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                  {recentActivities.map((activity, index) => (
                      <Table.Row key={index}>
                          <Table.Cell className="py-2">{activity.start_date}</Table.Cell>
                          <Table.Cell className="py-2">
                              <a
                                  href={`https://www.strava.com/activities/${activity.id}`}
                                  target="_blank"
                                  className="text-blue-600 hover:underline cursor-pointer"
                              >
                                  {activity.name}
                              </a>
                          </Table.Cell>
                          <Table.Cell className="py-2">{activity.type}</Table.Cell>
                          <Table.Cell className="py-2">{activity.distance}</Table.Cell>
                          <Table.Cell className="py-2">{activity.moving_time}</Table.Cell>
                          <Table.Cell className="py-2">{activity.total_elevation_gain}</Table.Cell>
                      </Table.Row>
                  ))}
                  <Table.Row key="index0">
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                    </Table.Row>
                    <Table.Row key="index1">
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                      <Table.Cell className="py-2"></Table.Cell>
                    </Table.Row>
              </Table.Body>
          </Table>
      </div>
  );
};

export default RecentActivities;
