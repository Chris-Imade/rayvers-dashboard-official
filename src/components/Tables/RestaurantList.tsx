import { useEffect, useState } from 'react';
import { BASE_URL } from '../DEFAULTS';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setRestaurants } from '../../Redux/Splice/AppSplice';
import LocalRes from '../LocalRes';

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
          {createRest ? "New Restaurant" : "Brand List"}
        </h4>
        <div>
          <h4
            onClick={() => setCreateRes((prev) => !prev)}
            className="hover:cursor-pointer mb-6 font-semibold text-black dark:text-white flex"
          >
            {createRest && <p className='mr-3'>&larr;</p>}
            Create Restaurant
          </h4>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ratings
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenues
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {!loading && localRes?.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={
                'https://firebasestorage.googleapis.com/v0/b/rayvers-kitchen-31287.appspot.com/o/bubble-gum-error-404.gif?alt=media&token=992bfe37-ca59-4813-9a38-38a3e862bfae'
              }
              style={{
                width: 300,
                height: 300,
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {loading && (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
        {localRes?.map((res, key) => (
          <div key={key}>
            <LocalRes res={res} key={key} localRes={localRes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
