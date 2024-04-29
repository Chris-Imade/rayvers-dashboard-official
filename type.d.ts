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