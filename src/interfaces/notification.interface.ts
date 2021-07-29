export default interface INotification {
  id?: string;
  read: boolean;
  text: string;
  time: number | null;
  type: string;
}