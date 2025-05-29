module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err)); // func is an async function that returns a promise
  };
};
