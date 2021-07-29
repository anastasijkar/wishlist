import React, { FC, useState, useEffect, useMemo } from 'react';
import { RouteComponentProps, Redirect } from "react-router-dom";

import { Space, Button, Tooltip } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors';

import Wish from '../../components/Wish/Wish';

import { fetchWishlist } from '../../features/wishlist/wishlistAPI';

import IWish from '../../interfaces/wish.interface';
import { useAppSelector } from '../../app/hooks';
import { selectUID } from '../../features/user/userSlice';

interface RouteParams {
  uid: string | undefined
}

const WishList: FC<RouteComponentProps<RouteParams>> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistData, setWishlistData] = useState<IWish[] | null>(null);
  const [redirectToAdd, setRedirectToAdd] = useState<boolean>(false);

  const ownUID = useAppSelector(selectUID);

  const fetchList = async () => {
    if (ownUID) {
      setLoading(true);
      const wishlist = await fetchWishlist(ownUID);
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

  const wishArray = wishlistData && wishlistData.length ? wishlistData.map((wish: IWish) => {
    return <Wish
      key={wish.id}
      title={wish.title}
      description={wish.description}
      image={wish.images && wish.images.length ? wish.images[0] : null}
      isOwn={true} />
  }) : [];

  const addNewWish = () => {
    setRedirectToAdd(true);
  }

  return (
    redirectToAdd
      ? <Redirect to="/wish/add" />
      : <section className="wishlist">
        {loading && <LoadingOutlined />}
        {(wishlistData && wishlistData.length)
          ? (<div>
            <Space size={[30, 45]} wrap align="start">
              {wishArray}
            </Space>
          </div>)
          : (!loading && <p>Nothing is there</p>)}
        <Tooltip placement="left" color={green[3]} title="Add a new Wish">
          <Button
            className="floating-button top right"
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
