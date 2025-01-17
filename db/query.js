const pool = require("./pool");

const auth = {
};

const user = {
  getByEmail: async (email) => {
    const SQL = `
      SELECT * FROM users
      WHERE email = $1;
    `;

    const { rows } = await pool.query(SQL, [email]);
    return rows[0];
  },

  getById: async (id) => {
    const SQL = `
      SELECT * FROM users
      WHERE id = $1;
    `;

    const { rows } = await pool.query(SQL, [id]);
    return rows[0];
  },

  insert: async (first_name, last_name, password_hashed, email) => {
    const SQL = `
      INSERT INTO users 
      (first_name, last_name, password_hashed, email)
      VALUES ($1, $2, $3, $4)
      RETURNING id, first_name, last_name, email, profile_pic_name, bio, joined_date, update_date;
    `;
    
    const { rows } = await pool.query(SQL, [first_name, last_name, password_hashed, email]);
    return rows[0];
  },
};

module.exports = {
  auth,
  user,
}
