import { db } from '../../firebase';

import IWish from '../../interfaces/wish.interface';

import WishGenerator from '../../utils/wish.generator';

export const fetchWishlist = async (uid: string) => {
  try {
    const userWishlistRef = await db.collection("Wishlists").doc(uid).collection("userWishlist").get();
    if (userWishlistRef) {
      let wishlist: IWish[] = [];
      userWishlistRef.forEach((wish) => {
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