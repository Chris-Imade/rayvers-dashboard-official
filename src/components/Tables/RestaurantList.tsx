import { useEffect, useState } from 'react';
import { BASE_URL } from '../DEFAULTS';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setRestaurants } from '../../Redux/Splice/AppSplice';
import LocalRes from '../LocalRes';
import BrandList from '../BrandList';
import CreateRest from '../CreateRest';

const RestaurantList = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createRest, setCreateRes] = useState<boolean>(false);
  const [localRes, setResLocalRes] = useState<Restaurant[] | null>(null);

  const token = useSelector((state: RootState) => state.data.token);
  const dispatch = useDispatch();

  const getRestaurants = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}api/restaurants/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const responseBody = await response.json();
        const { results } = responseBody;
        setLoading(false);
        setError(null);

        setResLocalRes(results);
        dispatch(setRestaurants(results));
      } else {
        const responseBody = await response.json();
        setError(responseBody.detail);
        console.log('Something went wrong');
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      setError('Error: ' + error.message);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {createRest ? 'New Restaurant' : 'Brand List'}
        </h4>
        <div>
          <h4
            onClick={() => setCreateRes((prev) => !prev)}
            className="hover:cursor-pointer mb-6 font-semibold text-black dark:text-white flex"
          >
            {createRest && <p className="mr-3">&larr;</p>}
            Create Restaurant
          </h4>
        </div>
      </div>

      {createRest ? (
        <CreateRest />
      ) : (
        <BrandList loading={loading} localRes={localRes} />
      )}
    </div>
  );
};

export default RestaurantList;
