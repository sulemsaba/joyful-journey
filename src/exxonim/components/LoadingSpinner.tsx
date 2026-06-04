import { useEffect, useRef, useState } from "react";

interface LoadingSpinnerProps {
  label?: string;
  compact?: boolean;
  minHeight?: string;
}

let nextLoaderId = 1;
const loaderRegistry = {
  active: new Set<number>(),
  leader: 0,
  subscribers: new Set<(leader: number) => void>(),
};

const notifyLeaderOverride = () => {
  const leader = loaderRegistry.leader;
  loaderRegistry.subscribers.forEach((callback) => callback(leader));
};

const registerLoader = (id: number) => {
  loaderRegistry.active.add(id);
  if (!loaderRegistry.leader) {
    loaderRegistry.leader = id;
    notifyLeaderOverride();
  }
  return () => {
    const wasLeader = loaderRegistry.leader === id;
    loaderRegistry.active.delete(id);
    if (wasLeader) {
      loaderRegistry.leader = loaderRegistry.active.values().next().value ?? 0;
      notifyLeaderOverride();
    }
  };
};

const subscribeToLeader = (callback: (leader: number) => void) => {
  loaderRegistry.subscribers.add(callback);
  callback(loaderRegistry.leader);
  return () => loaderRegistry.subscribers.delete(callback);
};

export function LoadingSpinner({
  label = "Loading content...",
  compact = false,
  minHeight,
}: LoadingSpinnerProps) {
  const reservedHeight = minHeight ?? (compact ? undefined : "clamp(18rem, 42vh, 28rem)");
  const idRef = useRef(nextLoaderId++);
  const [leader, setLeader] = useState(loaderRegistry.leader);

  useEffect(() => {
    const unsubscribeLeader = subscribeToLeader(setLeader);
    const unregister = registerLoader(idRef.current);
    return () => {
      unregister();
      unsubscribeLeader();
    };
  }, []);

  if (leader !== idRef.current) {
    return null;
  }

  return (
    <div
      className={`c-loading-spinner grid place-items-center gap-[0.9rem] p-12 text-center text-text-muted ${compact ? "p-4" : ""} ${reservedHeight ? "[min-height:var(--spinner-min-h)]" : ""}`}
      role="status"
      aria-live="polite"
      style={reservedHeight ? { '--spinner-min-h': reservedHeight } as React.CSSProperties : undefined}
    >
      <span
        className="block w-8 h-8 rounded-full border-2 border-accent-soft border-t-accent animate-spin"
        aria-hidden="true"
      />
      <p className="m-0 text-base leading-relaxed">{label}</p>
    </div>
  );
}
