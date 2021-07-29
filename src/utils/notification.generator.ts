import NOTIFICATION_TYPES from '../enums/notificationTypes.enum';
import INotification from '../interfaces/notification.interface';

export default class NotificationGenerator {
  notification: INotification;

  constructor(notificationId: string, apiNotification: any) {
    this.notification = this.makeNotification(notificationId, apiNotification);
  }

  private makeNotification(notificationId: string, apiNotification: any): INotification {
    return {
      id: notificationId,
      read: apiNotification.read || false,
      text: apiNotification.text || '',
      time: apiNotification.time || null,
      type: apiNotification.type || NOTIFICATION_TYPES.OTHER
    }
  }

  public returnNotification(): INotification {
    return this.notification;
  }
}