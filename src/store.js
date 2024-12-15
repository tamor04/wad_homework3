import { createStore } from 'vuex';
import apiClient from "../services/api.js"; //use the axios client defined in your project

const store = createStore({
  state: {
    posts: JSON.parse(localStorage.getItem('posts')) || [],   //initialize from localStorage
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
      localStorage.setItem('posts', JSON.stringify(posts)); //persist to localStorage
    },
    incrementLike(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.likes = (post.likes || 0) + 1;
        localStorage.setItem('posts', JSON.stringify(state.posts)); //persist updated likes
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => {
        post.likes = 0; //reset like count
      });
      localStorage.setItem('posts', JSON.stringify(state.posts)); //persist reset state
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      try {

        // fetch posts from the backend
        const response = await apiClient.get('/api/posts'); //call backend endpoint
        const posts = response.data;

        //combine fetched posts with saved likes from localStorage
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const postsWithLikes = posts.map(post => {
          const savedPost = savedPosts.find(p => p.id === post.id);
          return { ...post, likes: savedPost ? savedPost.likes : 0 };
        });

        commit('setPosts', postsWithLikes); //commit the posts with likes
      } catch (error) {
        console.error('Error fetching posts:', error);
      }


    },

    
    incrementLike({ commit }, postId) {
      commit('incrementLike', postId);    //commit the incremenrLike mutation
    },


    resetLikes({ commit }) {
      commit('resetLikes'); //commit the resetLikes mutation
    },


  },

  getters: {
    allPosts: state => state.posts, //getter to retrieve all posts
  },
});

export default store;
