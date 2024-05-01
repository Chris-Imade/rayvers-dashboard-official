import React from 'react';
import LocalRes from './LocalRes';

interface BrandListProp {
    loading: boolean;
    localRes: Restaurant[] | null;
}

const BrandList: React.FC<BrandListProp> = ({ loading, localRes }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
        <div className="p-2.5 xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
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
  );
};

export default BrandList;
