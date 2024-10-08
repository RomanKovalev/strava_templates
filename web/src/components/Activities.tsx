import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, TextInput } from 'flowbite-react';
import api from '../api';
import { setActivities as setAllActivities } from '../store/activitiesSlice';
import { RootState } from '../store/store';
import { Activity } from '../types';

const Activities = () => {
  const dispatch = useDispatch();
  const allActivities = useSelector((state: RootState) => state.activities.activities);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>('');
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get<Activity[]>('activities/');
        dispatch(setAllActivities(response.data));
      } catch (err) {
        console.log(err.message);
      } finally {
        console.log(false);
      }
    };
    fetchActivities();
  }, [dispatch]);

  const totalPages = Math.ceil(allActivities.length / itemsPerPage);

  const currentActivities = allActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      alert('Please enter a valid page number');
    }
    setPageInput('');
  };

  return (
    <div>
      <Card className="h-full">
        <div className="w-full flex flex-row justify-between align-items-center mb-5 mt-0">
          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
            Activities
          </h5>
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
            {currentActivities.map((activity) => (
              <Table.Row key={activity.id}>
                <Table.Cell className="py-2">{activity.start_date}</Table.Cell>
                <Table.Cell className="py-2">
                  <a
                    href={`https://www.strava.com/activities/${activity.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {activity.name}
                  </a>
                </Table.Cell>
                <Table.Cell className="py-2">{activity.type}</Table.Cell>
                <Table.Cell className="py-2">{activity.distance}</Table.Cell>
                <Table.Cell className="py-2">{activity.moving_time}</Table.Cell>
                <Table.Cell className="py-2">
                  {activity.total_elevation_gain}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex justify-between items-center mt-4">
          <Button onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </Button>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>

          <span className="flex items-center">
            Page {currentPage} of {totalPages}
            <form onSubmit={handlePageInput} className="flex items-center ml-4">
              <TextInput
                type="number"
                placeholder="Page number"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                className="mx-2"
                style={{ width: '80px' }}
              />
              <Button type="submit">Go</Button>
            </form>
          </span>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Activities;
