<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">

            <p1>Welcome to BananaIt!</p1>
            <p2>Login</p2>

            <form id="form" @submit.prevent="validateForm" action="/">
              <input type="email" v-model="email" placeholder="****@email.com" required />
              <input type="password" v-model="password" placeholder="Password" required />
              <button id="login_btn">Login</button>
            </form>
            <button href="/signup" id="signup_btn">Sign Up</button>

            <!-- Validation errors -->
            <div v-if="validationErrors.length" class="error-messages">
              <p3>Password or Email is not valid!</p3>
              <ul>
                <li v-for="(error, index) in validationErrors" :key="index">
                  {{ error }}
                </li>
              </ul>
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
import Index from "/AppIndex.vue"; // Ensure correct path
import Login from "/AppLogin.vue"; // Ensure correct path
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";


export default {
  components: {
    VoronoiBackground,
    Header,
    Footer,
    Index,
    Login,
  },
  data() {
    return {
      email: "",
      password: "",
      validationErrors: [],
    };
  },
  methods: {
    validateForm() {
      if (this.email && this.password) {
        
        // Add validation logic if needed
        // Redirect to another page
        
        window.location.href = "/"; 
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
};
</script>
<!-- not work like this, but should
<script>
import VoronoiBackground from "@/components/VoronoiBackground.vue";
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";
import apiClient from "services/api.js"; // Ensure correct path

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
        this.$router.push("/home");
      } catch (error) {
        // Display error message if login fails
        this.errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      }
    },

    goToSignup() {
      // Redirect to signup page
      this.$router.push("/signup");
    },
  },
};
</script>

-->
<style src="@/assets/login_style.css">
/* Add page-specific styles */
</style>

  