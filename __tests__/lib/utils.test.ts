import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (class name utility)', () => {
    it('should merge class names correctly', () => {
      expect(cn('base-class', 'another-class')).toBe('base-class another-class');
    });

    it('should filter out falsy values', () => {
      expect(cn('base-class', false && 'conditional-class', null, undefined, 0)).toBe('base-class');
    });

    it('should handle conditional classes correctly', () => {
      const isActive = true;
      const isDisabled = false;

      expect(cn('base-class', isActive && 'active', isDisabled && 'disabled')).toBe(
        'base-class active',
      );
    });

    it('should merge Tailwind classes with proper specificity using tailwind-merge', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    });
  });
});
