module.exports = {

  // Validating email
  validateEmail: (email) => {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (email) ? regex.test(email) : false;
  },
};
