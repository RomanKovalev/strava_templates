import React, { useEffect, useState } from 'react';
import api from "../api.js";
import { Table, Card } from 'flowbite-react';
const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('dashboard/');
        setActivities(response.data.activities);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 p-1" style={{ minWidth: '400px' }}>
                <Card className="h-full">
                    <div className="w-1/1 flex flex-row justify-between align-items-center">
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                            Most recent activities
                        </h5>
                        <h3><a href="#">All activities</a></h3>
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
                            {activities.map((activity, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell className="py-2">{activity.start_date}</Table.Cell>
                                    <Table.Cell className="py-2">{activity.name}</Table.Cell>
                                    <Table.Cell className="py-2">{activity.type}</Table.Cell>
                                    <Table.Cell className="py-2">{activity.distance}</Table.Cell>
                                    <Table.Cell className="py-2">{activity.moving_time}</Table.Cell>
                                    <Table.Cell className="py-2">{activity.total_elevation_gain}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card>
            </div>
            <div className="w-full md:w-2/5 p-1">
                <Card className="h-full flex flex-col justify-start">
                  <div className="flex-grow">
                        Since I began cycling 1 year and 6 months ago on 27-03-2023, I had 393 cycling days.
                        I recorded a total distance of 15 595 km (0.39 trips around the world 🌍 and 0.041 trips to the moon 🌕), an elevation of 104 156 m (11.8 times Mount Everest 🏔) and a total time of 3w 1d 6h 31m 🎉.
                        That's a daily average of 31 km, a weekly average of 214 km and a monthly average of 917 km 🐣.
                        I burned 315 593 calories doing so, that's about 1 169 pizza slices 🍕.
                    </div>
                </Card>
            </div>
        </div>
        <div className="flex">
            <div className="w-1/1 p-1">
                <Card className="h-full flex flex-col justify-start">
                    <div className="flex-grow">
                        The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=The diagramm is here=
                    </div>
                </Card>
            </div>
        </div>
    </>
  );
}

export default Dashboard;
