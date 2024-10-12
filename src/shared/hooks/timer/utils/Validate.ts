class Validate {
  static expiryTimestamp(expiryTimestamp: number) {
    return new Date(expiryTimestamp).getTime() > 0;
  }

  static onExpire(onExpire: () => void) {
    const isValid = onExpire && typeof onExpire === 'function';
    if (onExpire && !isValid) {
      console.warn('{ useTimer } Invalid onExpire settings function', onExpire); // eslint-disable-line
    }
    return isValid;
  }
}

export { Validate };
