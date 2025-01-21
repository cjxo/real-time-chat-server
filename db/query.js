const pool = require("./pool");

const auth = {
};

const userGetAll = async (whoAskedId) => {
  const SQL = `
    SELECT
      id, first_name, last_name, email, profile_pic_name, bio, joined_date, update_date,
      EXISTS (
        SELECT 1 FROM adds
        WHERE ((id_a = users.id) AND (id_b = $1)) OR ((id_a = $1) AND (id_b = users.id))
      ) AS added
    FROM users
    WHERE id != $1;
  `;

  const { rows } = await pool.query(SQL, [whoAskedId]);
  return rows;
}

const user = {
  deleteById: async (id) => {
    const SQL = `
      DELETE FROM users
      WHERE id = $1;
    `;

    await pool.query(SQL, [id]);
  },

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

  update: async (id, updated) => {
    const values = [];
    let SQL = `
      UPDATE users
      SET 
    `;

    const keys = Object.keys(updated);
    keys.forEach((key, idx) => {
      values.push(updated[key]);
      if (idx === (keys.length - 1)) {
        SQL += `${key} = $${idx + 1}`
      } else {
        SQL += `${key} = $${idx + 1}, `
      }
    });

    SQL += ` WHERE id = $${values.length + 1} RETURNING id, first_name, last_name, email, profile_pic_name, bio, joined_date, update_date;`;
    values.push(id);

    const { rows } = await pool.query(SQL, values);
    return rows[0];
  },

  getAll: userGetAll,

  add: async (idA, idB) => {
    const SQL = `
      INSERT INTO adds
      (id_a, id_b)
      VALUES ($1, $2);
    `;

    await pool.query(SQL, [idA, idB]);
  },
};

const message = {
  getAll: async (userId) => {
    const SQL = `
      SELECT
        m.id, m.content, m.sender_id, m.recipient_id, m.time_sent
      FROM messages AS m
      INNER JOIN adds AS a
        ON (m.sender_id = $1 AND m.recipient_id = a.id_b)
        OR (m.sender_id = a.id_a AND m.recipient_id = $1)
    `;

    const userAdds = await userGetAll(userId);
    const { rows } = await pool.query(SQL, [userId]);

    if (rows.length === 0) {
      return userAdds.map(user => ({ user, messages: [] }))
    } else {
      // TODO
    }
    return rows;
  },
};

module.exports = {
  auth,
  user,
  message,
}
