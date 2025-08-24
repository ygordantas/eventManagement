import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default interface PaginatedResult<T> {
  result: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
  hasMore: boolean;
}
