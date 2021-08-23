import IWish from '../interfaces/wish.interface';

export default class WishGenerator {
  wish: IWish;

  constructor(wishId: string | null, wishData: any) {
    this.wish = this.makeWish(wishId, wishData);
  }

  private makeWish(wishId: string | null, wishData: any): IWish {
    const wish: IWish = {
      title: wishData.title,
      description: wishData.description || '',
      images: wishData.images || null,
      tags: wishData.tags || null,
      dueDate: wishData.dueDate || Number.POSITIVE_INFINITY,
      taken: wishData.taken,
      status: wishData.status,
      surpriseSetting: wishData.surpriseSetting,
      takenByIds: wishData.takenByIds || null,
      takeTogetherRequest: wishData.takeTogetherRequest || null,
    }
    if (wishData.ownerId) {
      wish.ownerId = wishData.ownerId;
    }
    if (wishId) {
      wish.id = wishId;
    }
    return wish;
  }

  public returnWish(): IWish {
    return this.wish;
  }
}