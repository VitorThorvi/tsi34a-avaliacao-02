import { renderHook, act } from '@testing-library/react-native';
import { useToggle } from '../src/hooks/useToggle';

describe('useToggle Hook', () => {
  it('initializes with default value of false', () => {
    const { result } = renderHook(() => useToggle());
    
    expect(result.current.value).toBe(false);
  });

  it('initializes with custom initial value of true', () => {
    const { result } = renderHook(() => useToggle(true));
    
    expect(result.current.value).toBe(true);
  });

  it('initializes with custom initial value of false', () => {
    const { result } = renderHook(() => useToggle(false));
    
    expect(result.current.value).toBe(false);
  });

  it('toggles value from false to true', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.value).toBe(true);
  });

  it('toggles value from true to false', () => {
    const { result } = renderHook(() => useToggle(true));
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.value).toBe(false);
  });

  it('toggles value multiple times correctly', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
  });

  it('sets value to true using setTrue', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.setTrue();
    });
    
    expect(result.current.value).toBe(true);
  });

  it('setTrue keeps value as true when already true', () => {
    const { result } = renderHook(() => useToggle(true));
    
    act(() => {
      result.current.setTrue();
    });
    
    expect(result.current.value).toBe(true);
  });

  it('sets value to false using setFalse', () => {
    const { result } = renderHook(() => useToggle(true));
    
    act(() => {
      result.current.setFalse();
    });
    
    expect(result.current.value).toBe(false);
  });

  it('setFalse keeps value as false when already false', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.setFalse();
    });
    
    expect(result.current.value).toBe(false);
  });

  it('sets value directly using setValue', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);
    
    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });

  it('returns stable function references (memoization)', () => {
    const { result, rerender } = renderHook(() => useToggle(false));
    
    const firstToggle = result.current.toggle;
    const firstSetTrue = result.current.setTrue;
    const firstSetFalse = result.current.setFalse;
    
    // Trigger a rerender
    rerender({});
    
    expect(result.current.toggle).toBe(firstToggle);
    expect(result.current.setTrue).toBe(firstSetTrue);
    expect(result.current.setFalse).toBe(firstSetFalse);
  });

  it('works correctly in a sequence of different operations', () => {
    const { result } = renderHook(() => useToggle(false));
    
    // Start: false
    expect(result.current.value).toBe(false);
    
    // setTrue: true
    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
    
    // toggle: false
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
    
    // setValue(true): true
    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);
    
    // setFalse: false
    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });
});
