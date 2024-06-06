export const login = (req, res) => {
  console.log("Login route");
};

export const logout = (req, res) => {
  console.log("Logout route");
};

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
  } catch (error) {
    console.log("Error in signup route: ", error);
  }
};
