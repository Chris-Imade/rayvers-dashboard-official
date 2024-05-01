import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import RestaurantList from '../components/Tables/RestaurantList';
import DefaultLayout from '../layout/DefaultLayout';

const Restaurants = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Restaurants" />

      <div className="flex flex-col gap-10">
        <RestaurantList />
      </div>
    </DefaultLayout>
  );
};

export default Restaurants;