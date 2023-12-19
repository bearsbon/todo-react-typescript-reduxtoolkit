const useDebounce = (cb, time) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, time);
  };
};

export default useDebounce;
