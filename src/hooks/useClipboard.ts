import { useEffect, useRef, useState } from 'react';
import { copyText } from '../lib/clipboard';

export function useClipboard(write: (text: string) => Promise<boolean> = copyText) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  const copy = async (text: string) => {
    const success = await write(text);
    if (!mounted.current) return success;
    clearTimeout(timer.current);
    setCopied(success);
    if (success) timer.current = setTimeout(() => setCopied(false), 2400);
    return success;
  };
  return { copied, copy };
}
