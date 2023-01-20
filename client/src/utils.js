export const catchErrors = (func) => {
  return function (...args) {
    return func(...args).catch((err) => {
      console.log(err);
    });
  };
};
