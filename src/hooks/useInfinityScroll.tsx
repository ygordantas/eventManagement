import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useState, useRef } from "react";
import type PaginatedResult from "../models/PaginatedResult";
import useAlertContext from "./useAlertContext";

//https://medium.com/suyeonme/react/how-to-implement-an-infinite-scroll-749003e9896a
export default function useInfinityScroll<T>() {
  const [records, setRecords] = useState<T[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined);
  const { showErrorAlert } = useAlertContext();

  const clear = useCallback(() => {
    setRecords([]);
    setHasMore(true);
    lastDocRef.current = undefined;
  }, []);

  const loadRecords = useCallback(
    async (callback: (lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>) => Promise<PaginatedResult<T>>) => {
      try {
        setIsLoadingMore(true);
        const response = await callback(lastDocRef.current);

        setRecords((prev) => {
          // Prevent duplicates by checking IDs
          const existingIds = new Set(prev.map((item: T) => (item as { id: string }).id));
          const newEvents = response.result.filter((item: T) => !existingIds.has((item as { id: string }).id));
          return [...prev, ...newEvents];
        });

        lastDocRef.current = response.lastDoc || undefined;
        setHasMore(response.hasMore);
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoadingMore(false);
      }
    },
    [showErrorAlert]
  );

  return {
    records,
    isLoadingMore,
    hasMore,
    loadRecords,
    clear,
  };
}
