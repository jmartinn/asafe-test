import { renderHook } from '@testing-library/react';

import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile hook', () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  let matchMediaEventHandler: ((ev: MediaQueryListEvent) => any) | null = null;

  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      const mql = {
        matches: false,
        media: query,
        addEventListener: jest.fn((_event, handler) => {
          matchMediaEventHandler = handler;
        }),
        removeEventListener: jest.fn(),
      };
      return mql;
    });
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.matchMedia = originalMatchMedia;
    matchMediaEventHandler = null;
  });

  it('should return false when window width is above mobile breakpoint', () => {
    window.innerWidth = 1024;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true when window width is below mobile breakpoint', () => {
    window.innerWidth = 600;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should update when matchMedia listener fires', () => {
    window.innerWidth = 1024;

    const { result, rerender } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    if (matchMediaEventHandler) {
      window.innerWidth = 600;

      const event = { matches: true, media: '(max-width: 767px)' } as MediaQueryListEvent;

      matchMediaEventHandler(event);

      rerender();

      expect(result.current).toBe(true);
    } else {
      throw new Error('matchMediaEventHandler not set');
    }
  });
});
