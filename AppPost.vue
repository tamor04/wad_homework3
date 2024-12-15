<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">

            <h1>A Post</h1>
  
            <!-- Post Form -->
            <form @submit.prevent="updatePost" id="form">
              
              <textarea id="message" v-model="post.body" name="message" rows="7" cols="40" placeholder="Write your message here..."></textarea> 
              
              <button type="submit" id="login_btn">Update</button>
              <p11 id="login_btn">OR</p11>
              <button @click="deletePost" id="login_btn">Delete</button>
            </form>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>



<script>
import VoronoiBackground from "@/components/VoronoiBackground.vue";
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";

export default {
  components: {
    VoronoiBackground,
    Header,
    Footer,
  },


  data() {
    return {
      post: "", //holds the fetched post data
      errorMessage: "", //error handling
    };


  },


  methods: {
    async fetchPost() {
      const postId = this.$route.params.id; //get the post ID from the route
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        this.post = await response.json(); //populate post data
      } catch (error) {
        this.errorMessage = error.message;
        console.error(error);
      }
    },



    async updatePost() {
      const postId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ body: this.post.body }), //sends the updated body
          
        });

        if (!response.ok) throw new Error("Failed to update post");
        alert("Post updated successfully!");

      } catch (error) {
        this.errorMessage = error.message;
        console.error(error);
      }
    },


    async deletePost() {
      const postId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete post");
        alert("Post deleted successfully!");
        this.$router.push("/"); //back to main page

      } catch (error) {
        this.errorMessage = error.message;
        console.error(error);
      }
    },


  },
  mounted() {
    this.fetchPost(); //fetch the post when the component is mounted
  },
};



</script>
<style src="@/assets/login_style.css">
</style>

  