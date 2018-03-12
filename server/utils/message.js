const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date(Date.now()).toLocaleString()
  };
};

module.exports = {
  generateMessage
};
