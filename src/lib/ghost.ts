import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
// These should be set in your .env.local and GitHub Secrets
const api = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URL || 'https://demo.ghost.io',
  key: import.meta.env.VITE_GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062',
  version: "v5.0"
});

export const getGhostPosts = async () => {
  return await api.posts
    .browse({
      limit: "all",
      include: ["tags", "authors"]
    })
    .catch(err => {
      console.error("Ghost API Error:", err);
      return [];
    });
};

export const getSingleGhostPost = async (postSlug: string) => {
  return await api.posts
    .read({
      slug: postSlug,
      include: ["tags", "authors"]
    })
    .catch(err => {
      console.error("Ghost API Error:", err);
      return null;
    });
};
