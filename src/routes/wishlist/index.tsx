import React, { FC, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps, Redirect } from "react-router-dom";

import { Space, Button, Tooltip } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors';

import Wish from '../../components/Wish/Wish';
import WishWithWrapper from '../../components/Wish/WishWithWrapper';

import { fetchWishlist } from '../../features/wishlist/wishlistAPI';

import IWish from '../../interfaces/wish.interface';
import { useAppSelector } from '../../app/hooks';
import { selectUID } from '../../features/user/userSlice';
import WishFilter from '../../components/WishFilter/WishFilter';
import ICollectionSortingParams from '../../interfaces/api/collectionSortingParams.interface';
import ICollectionFilterParam from '../../interfaces/api/collectionFilterParam.interface';

interface RouteParams {
  uid: string | undefined
}

const WishList: FC<RouteComponentProps<RouteParams>> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistData, setWishlistData] = useState<IWish[] | null>(null);
  const [redirectToAdd, setRedirectToAdd] = useState<boolean>(false);

  const ownUID = useAppSelector(selectUID);

  const fetchList = async (sort?: ICollectionSortingParams, filter?: ICollectionFilterParam[]) => {
    console.log(sort)
    if (ownUID) {
      setLoading(true);
      const wishlist = await fetchWishlist(ownUID, { sort, filter });
      console.log(wishlist)
      if (wishlist) {
        setWishlistData(wishlist);
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList();
  }, [ownUID])

  const applyFilterSort = (sort?: ICollectionSortingParams, filter?: ICollectionFilterParam[]) => {
    fetchList(sort, filter);
  }

  const wishArray = wishlistData && wishlistData.length ? wishlistData.map((wish: IWish) => {
    return (
      <WishWithWrapper dueDate={wish.dueDate} key={wish.id}>
        <Wish
          title={wish.title}
          description={wish.description}
          image={wish.images && wish.images.length ? wish.images[0] : null}
          tags={wish.tags || []}
          isOwn={true}
          dueDate={wish.dueDate} />
      </WishWithWrapper>)
  }) : [];

  const addNewWish = () => {
    setRedirectToAdd(true);
  }

  return (
    redirectToAdd
      ? <Redirect to="/wish/add" />
      : <section className="wishlist">
        {(wishlistData && wishlistData.length) ? <WishFilter applyFilterSort={applyFilterSort} /> : ''}
        {loading && <LoadingOutlined />}
        {(wishlistData && wishlistData.length)
          ? (<div>
            <Space size={[30, 45]} wrap align="start">
              {wishArray}
            </Space>
          </div>)
          : (!loading && <p>Nothing is there</p>)}
        <Tooltip placement="left" color={green[4]} title="Add a new Wish">
          <Button
            className="floating-button bottom right"
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size='large'
            style={{ backgroundColor: green[5], borderColor: green[4] }}
            onClick={addNewWish}
          />
        </Tooltip>
      </section>
  );
}

export default WishList;
