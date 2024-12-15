<template>
  <div class="posts">
    <!-- Loop through posts array and render each post -->
    <div @click="goToPost(post.id)" class="post" v-for="post in posts" :key="post.id">
      <!-- @click="goToPost" -->
      <!-- Profile Section -->
      <div class="profile-section">

        
      </div>
    
      <!-- Title and Content -->
      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-content">{{ post.body }}</p>
    

    
      <!-- Create Date -->
      <p class="post-date">Posted on: {{ formatDate(post.date) }}</p>
    
      <!-- Like Button -->
      <!--<button @click="likePost(post.id)" class="like-btn">Like 🍌 {{ post.likes }}</button>-->
    </div>
    
    <!-- Reset Likes Button   ig, kuna see overwritten postituse poolt ning nõutud ple,   kõik muu toimib?    vaata, ma home page ei nääe-->
    <!--<button @click="resetLikes" class="reset-btn">Reset All Likes</button>-->
  </div>
</template>



<script>
export default {
  computed: {

    //get posts from the Vuex store
    posts() {
      return this.$store.getters.allPosts;
    }
  },
  methods: {

    formatDate(timestamp) {
      return new Date(timestamp).toISOString().split("T")[0];
    },

    async fetchPosts() {
      try {
        const response = await fetch("json.json");
        if (!response.ok) throw new Error("Failed to fetch data");

        //const posts = await response.json();

        //initialize likes if not provided
        //const postsWithLikes = posts.map(post => ({
        //  ...post,
       //  likes: post.likes || 0, 
        //}));
        
        //this.$store.commit('setPosts', postsWithLikes);  //commit to store after fetching posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },


    likePost(postId) {
      this.$store.dispatch('incrementLike', postId);
    },


    resetLikes() {
      this.$store.dispatch('resetLikes');
    },

    
    goToPost(postId) {
      this.$router.push("/post/" + postId); //redirect to the post page
    },
    
  },
  mounted() {
    this.$store.dispatch('fetchPosts');
  }

};
</script>

<style scoped>
  .post {
    min-width: 500px;
    max-width: 500px;
    cursor: pointer;
  }
  

  .post-content {
    padding-bottom: 5px;
  }

  .reset-btn {
    width: 200px;
    height: 30px;
    line-height: 30px;
    background-color: #005092;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    /* Center horizontally */
    margin: 20px auto 20px; /* Top margin of 50px, auto for horizontal centering */

    display: block; 
}
/* Add or copy styles from your existing CSS for the posts here */
</style>