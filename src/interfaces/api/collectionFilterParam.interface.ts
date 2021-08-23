import { WhereFilterOp } from "@firebase/firestore-types";

export default interface ICollectionFilterParam {
  fieldPath: string,
  opStr: WhereFilterOp,
  value: any
}