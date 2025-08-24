import { useEffect, useRef, useCallback } from "react";
import type { PropsWithChildren } from "react";
import classes from "./EventGrid.module.css";

type EventGridProps = {
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
};

export default function EventGrid({
  children,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: PropsWithChildren<EventGridProps>) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Don't create observer if no onLoadMore function, loading, or no more items
      if (!node || !onLoadMore || isLoading || !hasMore) {
        return;
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            onLoadMore();
          }
        },
        {
          rootMargin: "100px", // Start loading 100px before reaching the trigger
        }
      );

      observerRef.current.observe(node);
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={classes.eventsGrid}>
      {children}
      {hasMore && onLoadMore && (
        <div ref={lastElementRef} className={classes.loadingTrigger}>
          {isLoading && <div className={classes.loadingSpinner}>Loading more events...</div>}
        </div>
      )}
    </div>
  );
}
