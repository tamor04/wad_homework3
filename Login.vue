<template>
    <div class="container">
      <Header />
      <main class="main-content">
        <form id="form" action="#">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button id="login_btn">Log In</button>
        </form>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue";
  
  export default {
    components: {
      Header,
      Footer,
    },
  };
  </script>
  
  <style src="@assets/login_style.css">
  /* Add page-specific styles or import global styles */
  </style>
  