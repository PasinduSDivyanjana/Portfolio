import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClipboard } from '../hooks/useClipboard';
describe('clipboard feedback', () => {
  afterEach(() => vi.useRealTimers());
  it('reports success briefly, then resets feedback', async () => {
    vi.useFakeTimers();
    const write = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useClipboard(write));
    await act(async () => {
      await result.current.copy('hello@example.com');
    });
    expect(write).toHaveBeenCalledWith('hello@example.com');
    expect(result.current.copied).toBe(true);
    act(() => vi.advanceTimersByTime(2400));
    expect(result.current.copied).toBe(false);
  });
  it('exposes clipboard failure so the caller can offer its fallback', async () => {
    const { result } = renderHook(() => useClipboard(async () => false));
    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.copy('text');
    });
    expect(success).toBe(false);
    expect(result.current.copied).toBe(false);
  });
});
