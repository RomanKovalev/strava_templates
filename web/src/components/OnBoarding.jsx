import { useState } from "react";
import api from "../api.js";
import { setOnboarded as setOnboardedAction } from "../store/authSlice.js";
import {useDispatch} from "react-redux";


const OnBoarding = () => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
         const setOnboarded = async () => {
            try {
                const response = await api.post('onboarding/');
                console.log(response);
                dispatch(setOnboardedAction())
            } catch (err) {
                console.log(err);
                // setError(err.message);
            } finally {
                // setLoading(false);
            }
        };
        setOnboarded();
    };

    return (
        <div>
            <h1>Onboarding</h1>
            <p>
                I hereby give explicit consent for the collection and processing of my data from Strava.com for the
                purposes of visualizing and displaying this data in my account on Altfitx.com.
            </p>
            <form className="space-y-6">
                <div className="flex items-center mt-3">
                    <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
                        I agree
                    </label>
                </div>

                <button
                    type="submit"
                    className={`w-350 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        !isChecked ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isChecked}
                    onClick={handleSubmit}
                >
                    Sync Strava Activities
                </button>
            </form>
        </div>
    )
}


export default OnBoarding;