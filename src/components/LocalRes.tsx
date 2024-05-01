import React, { useEffect, useState } from 'react';
import ProfileDemo from '../images/profile-demo.png';
import { formatNumber } from '../utils/currencyFormatter';
import { BASE_URL } from './DEFAULTS';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import Location from "../images/location.png";
import Dish from './Dish';

interface LocalResProps {
  res: Restaurant;
  key: number;
  localRes: Restaurant[];
}

const LocalRes: React.FC<LocalResProps> = ({ res, key, localRes }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [restaurant, setRestaurant] = useState<RestDetail | null>(null);

  console.log('Loading: ', loading);
  console.log('Restaurant: ', restaurant);

  const token = useSelector((state: RootState) => state.data.token);


    const getRestaurant = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}api/restaurants/${res.id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                }
            })

            if(response.ok) {
                setLoading(false);
                const results = await response.json();
                setRestaurant(results);
            } else {
                const errRes = await response.text();
                setError('Error: ' + errRes);
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            console.log("Error: " + error.message);
            setError('Error Fetching Restaurants: ' + error.message);
        }
    }

    useEffect(() => {
        getRestaurant();
    }, []);

  return (
    <div className='flex flex-col'>
      <div
        onClick={() => setShowDetails((prevState) => !prevState)}
        className={`grid grid-cols-3 sm:grid-cols-4 hover:cursor-pointer hover:bg-slate-800 ${
          key === localRes?.length - 1
            ? ''
            : 'border-b border-stroke dark:border-strokedark'
        }`}
      >
        <div className="flex items-center gap-3 p-2.5 xl:p-5">
          <div className="flex-shrink-0">
            <img
              src={res?.image_url?.length ? res.image_url : ProfileDemo}
              className="w-10"
              alt={res.name}
            />
          </div>
          <p className="hidden text-black dark:text-white sm:block">
            {res?.name ? res?.name : 'Empty'}
          </p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">{res.ratings}.0</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-meta-3">₦{formatNumber(Number(res?.balance))}</p>
        </div>

        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <button className="text-red-400">Delete</button>
        </div>
      </div>

      {/* Restaurant Details */}
      {showDetails && (
        <div className='mt-5'>
            <h2 className='text-xl text-white font-semibold'>About</h2>
            <p>{restaurant?.description}</p>
            <div className='flex items-center mt-4'>
                <img width={24} src={Location} alt="location" />
                <p className=''>{restaurant?.address}</p>
            </div>

            {/* Dishes */}
            <div className='flex mt-4 mb-6'>
                {restaurant?._dishes.map((dish, _) => (
                    <Dish dish={dish} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default LocalRes;
