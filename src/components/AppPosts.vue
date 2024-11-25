<template>
  <div class="posts">
    <!-- Loop through posts array and render each post -->
    <div class="post" v-for="post in posts" :key="post.id">
      <!-- Profile Section -->
      <div class="profile-section">
        <img
          :src="post.profile_pic || placeholderImage"
          :alt="`${post.author}'s profile picture`"
          class="post-profile-icon"
          @error="onImageError"
        />
        <p>{{ post.author }}</p>
      </div>
    
      <!-- Title and Content -->
      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-content">{{ post.content }}</p>
    
      <!-- Post Picture -->
      <img
        v-if="post.post_pic"
        :src="post.post_pic"
        :alt="`${post.title} image`"
        class="post-image"
        @error="onImageError"
      />
    
      <!-- Create Date -->
      <p class="post-date">Posted on: {{ post.create_date }}</p>
    
      <!-- Like Button -->
      <button @click="likePost(post.id)" class="like-btn">Like 🍌 {{ post.likes }}</button>
    </div>
    
    <!-- Reset Likes Button -->
    <button @click="resetLikes" class="reset-btn">Reset All Likes</button>
  </div>
</template>

<script>
export default {
  computed: {
    // Get posts from the Vuex store
    posts() {
      return this.$store.getters.allPosts;
    }
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch("json.json"); // Update to your actual data source
        if (!response.ok) throw new Error("Failed to fetch data");

        const posts = await response.json();
        // Initialize likes if not provided
        const postsWithLikes = posts.map(post => ({
          ...post,
          likes: post.likes || 0, 
        }));
        // Commit to store after fetching posts
        this.$store.commit('setPosts', postsWithLikes);
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
    onImageError(event) {
      // Fallback for failed image loading
      event.target.src = "https://www.pngall.com/wp-content/uploads/2016/04/Banana-PNG-File.png";
    },
  },
  mounted() {
    this.$store.dispatch('fetchPosts');
  }

};
</script>

<style scoped>
/* Add or copy styles from your existing CSS for the posts here */
</style>
