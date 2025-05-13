import { useCallback, useEffect, useState } from "react";
interface UseShareParams {
  onShare?: (content: ShareParams) => void;
  onSuccess?: (content: ShareParams) => void;
  onError?: (error: any) => void;
  fallback?: () => void;
  successTimeout?: number;
}

interface ShareParams {
  title?: string;
  text?: string;
  url?: string;
}

const useShare = ({
  onShare,
  onSuccess,
  onError,
  fallback,
  successTimeout = 3000,
}: UseShareParams) => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "navigator" in window) {
      setIsSupported("share" in navigator);
      setIsReady(true);
    }
  }, []);

  const resetIsShared = (timeout: number) => {
    const timer = setTimeout(() => setIsShared(false), timeout);
    return () => clearTimeout(timer);
  };

  const share = useCallback(
    async (content: ShareParams) => {
      if (isSupported) {
        onShare?.(content);

        try {
          await navigator.share(content);
          setIsShared(true);

          onSuccess?.(content);

          return resetIsShared(successTimeout);
        } catch (error) {
          onError?.(error);
        }
      } else {
        fallback?.();
        setIsShared(true);

        return resetIsShared(successTimeout);
      }
    },
    [fallback, isSupported, onError, onShare, onSuccess, successTimeout],
  );

  return { share, isSupported, isReady, isShared };
};

export default useShare;