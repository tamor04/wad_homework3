<template>
    <div class="container">
      <Header />
      <main class="main-content">
        <Posts />
        <!-- <div class="posts">
            
          Dynamic content will go here
        </div> -->
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue";
  import Posts from "./components/Posts.vue";
  
  export default {
    components: {
      Header,
      Footer,
      Posts,
    },
  };
  </script>
  
  <style src="@assets/index_style.css">
  /* Move your existing CSS here or import from a global CSS file */
  </style>
  