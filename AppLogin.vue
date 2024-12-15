<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">
            <h1>Welcome to BananaIt!</h1>
            <h2>Login</h2>
  
            <!-- Login form -->
            <form id="form" @submit.prevent="loginUser">
              <input type="email" v-model="email" placeholder="****@email.com" required />
              <input type="password" v-model="password" placeholder="Password" required />
              <button id="login_btn">Login</button>
              <p11 id="login_btn">OR</p11>
              <button @click="goToSignup" id="signup_btn">Sign Up</button>
            </form>

  
            <!-- Validation errors -->
            <div v-if="validationErrors.length" class="error-messages">
              <p>Password or Email is not valid!</p>
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
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";
//import apiClient from "/services/api.js"; 

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
      this.validationErrors = [];
      var data = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookies if necessary
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed. Please try again.");
        }

        const responseData = await response.json();
        console.log(responseData);

        this.$router.push("/");
        //location.assign("/");
        
      } catch (error) {
        //display error message if login fails
        this.errorMessage = error.response?.data?.error || "Login failed. Please try again.";
        this.validationErrors = [this.errorMessage]; // Populate validationErrors array
      }


      /*
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
      }*/
    },

    goToSignup() {
      this.$router.push("/signup");  //sends to signup page
    },
  },
};



</script>
<style src="@/assets/login_style.css">
</style>

  