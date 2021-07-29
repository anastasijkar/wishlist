import { db } from '../../firebase';

import INotification from '../../interfaces/notification.interface';

import NotificationGenerator from '../../utils/notification.generator';

export const getUserNotifications = async (uid: string) => {
  try {
    const notificationsRef = await db.collection('UserNotifications').doc(uid).collection('notifications').get();
    if (notificationsRef) {
      let notifications: INotification[] = [];
      notificationsRef.forEach((notification) => {
        // doc.data() is never undefined for query doc snapshots
        notifications.push(new NotificationGenerator(notification.id, notification.data()).returnNotification());
      });
      return notifications;
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const addUserNotification = async (uid: string, notification: INotification) => {
  try {
    const newNotificationRef = await db.collection("UserNotifications").doc(uid).collection('notifications').add(notification);
    if (newNotificationRef) {
      return {
        id: newNotificationRef.id,
        ...notification
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

