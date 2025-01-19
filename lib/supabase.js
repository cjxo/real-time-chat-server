const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const supabase = createClient(process.env.SUPABASE_PROJ_URL, process.env.SUPABASE_API_KEY);

const bucketNameFromId = (id) => {
  return `user-${id}`;
};

module.exports = {
  instance: supabase,
  storage: {
    newUserStore: async (id) => {
      const { data, error } = await supabase
        .storage
        .createBucket(bucketNameFromId(id), {
          public: true,
          allowedMimeTypes: ["image/png", "image/jpg", "image/svg+xml"],
        });

      if (error) {
        console.error(error);
        return false;
      } else {
        return true;
      }
    },
  },
};
