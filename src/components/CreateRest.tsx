import { CSSProperties, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { BASE_URL } from './DEFAULTS';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { createRestCred, setUserId } from '../Redux/Splice/AppSplice';
import VerifyCode from './VerifyCode';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'white',
};

const CreateRest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [verify, setVerify] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [newResUserId, setNewResUserId] = useState<number | null>(null);

  const token = useSelector((state: RootState) => state.data.token);
  const restCredentials = useSelector(
    (state: RootState) => state.data.restCredentials,
  );
  const dispatch = useDispatch();
  // create restaurant
  // use verify_code component
  // save restaurantId to array of [{ restaurantId: 2, kithenId: 'HdsY84', password: 'SomePass', name: 'Rest name' }]

  const createRestaurant = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}auth/restaurants/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        const { message, user_id, kithen_id } = await response.json();
        setSuccess(message);
        setNewResUserId(user_id);
        dispatch(
          createRestCred({
            kitchenId: kithen_id,
            name,
            password,
            restaurantId: user_id,
          }),
        );
        setVerify(true);
      } else {
        const errRes = await response.json();
        setError('Error: ' + errRes);
        console.log('Error: ', errRes);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setError('Error: ' + error.message);
      console.log('Error: ', error.message);
    }
  };

  return (
    <div className="flex flex-col gap-9 mb-6">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create Restaurant &rarr;{' '}
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : success ? (
              <p className="text-green-500">{success}</p>
            ) : (
              ''
            )}
          </h3>
        </div>
        {!verify ? (
          <div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Restaurant's name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Please enter a valid email."
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter a secure password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Restaurant's Address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe this restaurant..."
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <button
                onClick={createRestaurant}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {loading ? (
                  <ClipLoader
                    color={'#ffffff'}
                    loading={loading}
                    cssOverride={override}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  'Create Restaurant'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <VerifyCode newResUserId={newResUserId} setSuccess={setVerify} />
          </div>
        )}
      </div>

      <h1 className="text-xl">Created Restaurant's Credentials &rarr;</h1>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Password
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              KitchenID/Login ID
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              RestaurantID
            </h5>
          </div>
        </div>

        {restCredentials &&
          restCredentials?.map((res, key) => (
            <div className="flex flex-col">
              <div
                className={`grid grid-cols-3 sm:grid-cols-4 hover:cursor-pointer hover:bg-slate-800 ${
                  key === restCredentials?.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <p className="text-black dark:text-white sm:block">
                      {res?.name && res?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {res.password && res.password}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {res.kitchenId && res.kitchenId}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  {res.restaurantId}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreateRest;
