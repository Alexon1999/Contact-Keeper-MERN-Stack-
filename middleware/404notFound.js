const notFound = (req, res) => {
  return res.status(404).json({ msg: 'Page not Found' });
};

module.exports = notFound;
