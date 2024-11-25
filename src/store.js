import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Initialize posts from localStorage or use an empty array if nothing is found
    posts: JSON.parse(localStorage.getItem('posts')) || [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
      localStorage.setItem('posts', JSON.stringify(posts)); // Persist to localStorage
    },
    incrementLike(state, postId) {
        const post = state.posts.find(post => post.id === postId);
        if (post) {
          post.likes = (post.likes || 0) + 1;
          localStorage.setItem('posts', JSON.stringify(state.posts)); // Persist updated likes
        }
    },
      resetLikes(state) {
        state.posts.forEach(post => {
          post.likes = 0; // Reset like count
        });
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Persist reset state
      },
  },

  actions: {
    async fetchPosts({ commit }) {
        try {
          const response = await fetch('public/json.json'); // Fetch data from json.json in public folder
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const posts = await response.json();

          // Combine fetched posts with saved likes
          const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
          const postsWithLikes = posts.map(post => {
            const savedPost = savedPosts.find(p => p.id === post.id);
            return { ...post, likes: savedPost ? savedPost.likes : 0 };
          });

          commit('setPosts', postsWithLikes);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
    incrementLike({ commit }, postId) {
      commit('incrementLike', postId);  // Commit the incrementLike mutation
    },
    resetLikes({ commit }) {
      commit('resetLikes');  // Commit the resetLikes mutation
    }
  },
  getters: {
    allPosts: state => state.posts,  // Return all posts from the state
  }
});

export default store;
