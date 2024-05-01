type UserInfo = {
  name: string;
  email: string;
};

type Profile = {
  id: number;
  email?: string;
  name?: string | null;
  date_of_birth?: null;
  image_url?: string | null;
  permissions: {
    is_superuser?: boolean;
    is_driver?: boolean;
    is_restaurant?: boolean;
    is_customer?: boolean;
  };
  profile_picture?: string;
  bio?: string | null;
  role?: string;
};

interface Restaurant {
  name: string;
  description: string;
  ratings: string;
  image_url: string;
  id: number;
  address?: string;
  balance?: string;
}
interface Dish {
  _ingredients: string[];
  category: number;
  delivery_options: string;
  description: string;
  favourite: number[];
  id: number;
  image_urls: { id: number; url: string }[];
  images: { file: string; id: number; label: string }[];
  name: string;
  price: number;
  ratings: number;
  restaurant: number;
  restaurant_details: { name: string; ratings: number };
  time_duration: number;
  itemCount: number;
}

interface RestDetail {
  address: string | null;
  description: string | null;
  id: number;
  image: string | null;
  name: string | null;
  rating: number;
  _dishes: Dish[];
}
