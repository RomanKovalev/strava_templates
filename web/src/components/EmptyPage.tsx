import { useState, ChangeEvent, FormEvent } from 'react';
import api from '../api';
import { setOnboarded as setOnboardedAction } from '../store/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../store/store";

const EmptyPage: React.FC = () => {
  const dispatch = useDispatch();
  const isEnoughActivities = useSelector((state: RootState) => state.auth.user.isEnoughActivities);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await api.post('sync/');
      console.log(response);
      // dispatch(setOnboardedAction());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isEnoughActivities ? "Syncronization started, we will send you email, when it will be finished" : <p>
        You need to synchronize your activities for the first time.
      </p>
      }
    </div>
  );
};

export default EmptyPage;
