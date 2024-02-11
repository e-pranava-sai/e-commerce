const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const getUserByEmailPassword =
  "SELECT * FROM users WHERE email = $1 AND password = $2";
const createUser =
  "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateUser =
  "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4";

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getUserByEmail,
  deleteUser,
  updateUser,
  getUserByEmailPassword,
};
