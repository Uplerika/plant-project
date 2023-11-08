export function debounce(callee, timeoutMs) {
    let timeout;
    return function perform(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callee.apply(this, args),timeoutMs);
    };
  }