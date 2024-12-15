<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">
            <h1>Have a Question?</h1>
            <h2>Contact Us!</h2>

            <div class="buttons">
              <a href="#" class="cnt_btn">Customer Support</a>
              <a href="#" class="cnt_btn">Facebook</a>
              <a href="#" class="cnt_btn">E-Mail</a>
              <a href="#" class="cnt_btn">Twitter</a>
              <a href="#" class="cnt_btn">Instagram</a>
            </div>    
            

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
      email: "",
      password: "",
      validationErrors: [], // Initialize validationErrors as an empty array
      errorMessage: "", // For displaying login errors
    };
  },


  methods: {
    async loginUser() {
      try {
        // Send login request to backend
        const response = await apiClient.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        // Store the JWT token in localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to home page after successful login
        this.$router.push("/");


      } catch (error) {
        // Display error message if login fails
        this.errorMessage = error.response?.data?.error || "Login failed. Please try again.";
        this.validationErrors = [this.errorMessage]; // Populate validationErrors array
      }
    },

    goToSignup() {
      this.$router.push("/signup");  // sends to signup page
    },
  },

  
};




</script>
<style src="@/assets/login_style.css">  
</style>

  