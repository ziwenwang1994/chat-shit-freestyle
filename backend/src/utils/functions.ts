import User from "../models/User.js";

export const getUserByIdAndEmail = async ({ email, id }) => {
  try {
    const user = await User.findOne({ email });
    if (id === user._id.toString()) {
      return user;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
