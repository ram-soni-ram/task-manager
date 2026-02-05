const filterQuery = (queryObject, userId) => {
  const page = parseInt(queryObject?.page) || 1;
  const limit = parseInt(queryObject?.limit) || 10;
  const skip = (page - 1) * limit;

  const { sort, search, status } = queryObject;
  const searchQuery = { author: userId };
  let sortDirection = -1;

  if (search) {
    searchQuery.title = { $regex: search, $options: "i" };
  }
  if (status && status !== "all" && ["pending", "success"].includes(status)) {
    searchQuery.status = status;
  }
  if (sort === "oldest") {
    sortDirection = 1;
  }

  return { searchQuery, sortDirection, page, limit, skip };
};

export default filterQuery;
