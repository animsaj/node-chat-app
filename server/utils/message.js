const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date(Date.now()).toLocaleString()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://google.com/maps/?q=${latitude},${longitude}`,
    createdAt: new Date(Date.now()).toLocaleString()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
