import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  // renderMany(users: Users[]) {
  //     return users.map((users) => this.render(users));
  // },
};
