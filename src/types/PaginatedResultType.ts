import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

export type PaginatedResultType<T> = {
  records: T[];
  hasMore?: boolean;
  lastDoc?: DocumentSnapshot<DocumentData, DocumentData>;
};
