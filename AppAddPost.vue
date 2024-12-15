<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">

            <h1>Add Post</h1>
  
           
            <form id="form" @submit.prevent="addPost">

              <textarea 
                v-model="postTitle"
                placeholder="Title"                   
                rows="1"
                cols="30"
                required
              ></textarea>

              <textarea
                v-model="postBody"
                placeholder="Write your post here..."                   
                rows="7"
                cols="30"
                required
              ></textarea>

              <button type="submit" id="add_btn">Add</button>

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
import apiClient from "/services/api.js";

export default {
  components: {
    VoronoiBackground,
    Header,
    Footer,
  },


  data() {
    return {
      postTitle: "",
      postBody: "",
    };
  },


  methods: {
    async addPost() {
      try {

       
        const response = await apiClient.post("/api/posts", {  //send post data to backend
          url: this.postUrl,
          body: this.postBody,
          title: this.postTitle,
          date: this.postDate
        });

        
        console.log("Post added:", response.data);   //shows success message and reset inputs
        alert("Post successfully added!");
        console.log(this.postDate);
        this.postTitle = "";
        this.postBody = "";
        this.postUrl = "";
        this.postDate = "";

    
      } catch (error) { //error message
        this.errorMessage =
          error.response?.data?.error || "Failed to add post. Please try again.";
        console.error(this.errorMessage);
      }
    },
  },


};


</script>
<style src="@/assets/login_style.css">
</style>
