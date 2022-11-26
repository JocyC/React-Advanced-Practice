const paginate = (followers) => {
  const perPage = 8;
  const pages = Math.ceil(followers.length / perPage);
  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * perPage;
    return followers.slice(start, start + perPage);
  });
  return newFollowers;
};

export default paginate;
