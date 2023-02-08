const { Blog, Comment, User } = require("../models");

module.exports = {

  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  // get_creator: async (user) => {
  //   const userData = await User.findByPk(id)
  //   const user = userData.get({plain: true});
  //   console.log(user);
  //   return user.username;
  // }
};
