import { db } from '../../firebase';
import ICollectionFilterParam from '../../interfaces/api/collectionFilterParam.interface';
import ICollectionSortingParams from '../../interfaces/api/collectionSortingParams.interface';

import IWish from '../../interfaces/wish.interface';

import WishGenerator from '../../utils/wish.generator';

export const fetchWishlist = async (uid: string, params?: {
  sort?: ICollectionSortingParams,
  filter?: ICollectionFilterParam[]
}) => {
  try {

    let userWishlistRef: any = db.collection("Wishlists").doc(uid).collection("userWishlist");

    if (params) {
      if (params.sort) {
        userWishlistRef = userWishlistRef.orderBy(params.sort.fieldName, params.sort.descending ? 'desc' : undefined)
      }
      if (params.filter && params.filter.length) {
        params.filter.forEach((filterParam: ICollectionFilterParam) => {
          userWishlistRef = userWishlistRef.where(filterParam.fieldPath, filterParam.opStr, filterParam.value);
        })
      }
    }

    const userWishlist = await userWishlistRef.get();
    if (userWishlist) {
      let wishlist: IWish[] = [];
      userWishlist.forEach((wish: any) => {
        // doc.data() is never undefined for query doc snapshots
        wishlist.push(new WishGenerator(wish.id, wish.data()).returnWish());
      });
      return wishlist;
    }
  } catch (err) {
    throw new Error(err);
  }
}

export const addWish = async (uid: string, wish: IWish) => {
  try {
    await db.collection("Wishlists").doc(uid).collection("userWishlist").add({ ...wish });
    return true;
  } catch (err) {
    throw new Error(err);
  }
}