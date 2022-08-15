export const GET = async () => {
  const allPostFiles = import.meta.glob('../blog/*.md');
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = (await resolver()) as PostMetadata;

      const postPath = path.slice(2, -3);

      return {
        meta: metadata,
        path: postPath,
      };
    })
  );
  const sortedPosts = allPosts.sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));

  return {
    body: sortedPosts,
  };
};
