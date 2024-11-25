<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <main class="main-content">
        <div class="post">
          <div class="post-body">

            <p1>Welcome to BananaIt!</p1>
            <p2>Create an account</p2>

            <form id="form" @submit.prevent="validateForm" action="/">
              <input type="email" v-model="email" placeholder="****@email.com" required />
              <input type="password" v-model="password" placeholder="Password" required />
              <button id="login_btn">Sign Up</button>
            </form>

            <!-- Validation errors -->
            <div v-if="validationErrors.length" class="error-messages">
              <p3>Password is not valid:</p3>
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
      this.validationErrors = []; // Clear previous errors

      // Password validation rules
      if (this.password.length < 8 || this.password.length >= 15) {
        this.validationErrors.push("Password must be between 8 and 15 characters.");
      }
      if (!/[A-Z]/.test(this.password)) {
        this.validationErrors.push("Password must include at least one uppercase letter.");
      }
      if (!/(.*[a-z]){2}/.test(this.password)) {
        this.validationErrors.push("Password must include at least two lowercase letters.");
      }
      if (!/[0-9]/.test(this.password)) {
        this.validationErrors.push("Password must include at least one numeric value.");
      }
      if (!/^([A-Z])/.test(this.password)) {
        this.validationErrors.push("Password must start with an uppercase letter.");
      }
      if (!/\_/.test(this.password)) {
        this.validationErrors.push("Password must include the character '_'.");
      }

      // If there are no errors
      if (this.validationErrors.length === 0) {
        alert("Sign-up successful!");
        // Additional logic (e.g., sending data to the server) can be added here.
      }
    },
  },
};
</script>

<style src="@/assets/login_style.css">
/* Add page-specific styles */
</style>

  