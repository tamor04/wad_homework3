<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">


            <h1>Welcome to BananaIt!</h1>
            <h2>Create an account</h2>
  
            <form id="form" @submit.prevent="registerUser">
              <input type="email" v-model="email" placeholder="****@email.com" required />
              <input type="password" v-model="password" placeholder="Password" required />
              <button id="signup_btn">Sign Up</button>
            </form>
  
            <!-- Validation errors -->
            <div v-if="validationErrors.length" class="error-messages">
              <p3>Not able to sign in:</p3>
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
      validationErrors: [],
    };
  },
  methods: {
    validatePassword() {
      this.validationErrors = []; //clear previous errors

      //Makes sure password is treated as a string
      const password = String(this.password || "").trim();

      //password validation rules
      if (password.length < 8 || password.length > 15) {
        this.validationErrors.push("Password must be between 8 and 15 characters.");
      }
      if (!/[A-Z]/.test(password)) {
        this.validationErrors.push("Password must include at least one uppercase letter.");
      }
      if (!/(.*[a-z]){2}/.test(password)) {
        this.validationErrors.push("Password must include at least two lowercase letters.");
      }
      if (!/[0-9]/.test(password)) {
        this.validationErrors.push("Password must include at least one numeric value.");
      }
      if (!/^([A-Z])/.test(password)) {
        this.validationErrors.push("Password must start with an uppercase letter.");
      }
      if (!/[_]/.test(password)) {
        this.validationErrors.push("Password must include the character '_'.");
      }
    },


    /*async registerUser() {
      // Ensure email and password are explicitly treated as strings
      this.email = String(this.email || "").trim();
      this.password = String(this.password || "").trim();

      this.validatePassword(); // Validate the password first

      if (this.validationErrors.length > 0) {
        return; // If there are validation errors, stop here
      }

      try {
        // Send signup request to the backend
        //const response = 
        await apiClient.post("/auth/signup", {
          email: this.email,
          password: this.password,
        });

        // Show success message and redirect to login
        alert("Signup successful! You can now log in.");
        this.$router.push("/login");
      } catch (error) {
        // Handle errors (e.g., duplicate email)
        this.validationErrors = [error.response?.data?.error || "Signup failed. Please try again."];
      }
    },*/

    async registerUser() {
      this.validationErrors = [];
      const data = {
        email: this.email.trim(),
        password: this.password.trim(),
      };

      this.validatePassword(); //validate the password first

      if (this.validationErrors.length > 0) {
        return; // If there are validation errors, stop here
      }
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      try {
        const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Signup failed. Please try again.");
        }

        const responseData = await response.json();
        console.log(responseData);
         
    
        alert("Signup successful! You can now log in.");
        this.$router.push("/login");
      }
      catch (error) {  //handles errors (duplicate emails for exampl)
        this.validationErrors = [error.message || "Signup failed. Please try again."];
      }
    },
  },

  
};



</script>
<style src="@/assets/login_style.css">
</style>

  