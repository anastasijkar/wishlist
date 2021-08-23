export default interface IWish {
  id?: string,
  title: string,
  description: string,
  images: string[] | null,
  tags: string[] | null,
  dueDate: number,
  taken: boolean,
  status: string,
  surpriseSetting: string
  takenByIds: string[] | null,
  takeTogetherRequest: boolean,
  ownerId?: string,
}