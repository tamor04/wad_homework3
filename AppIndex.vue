<template>
  <div class="voronoi">
    <VoronoiBackground />
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
  </div>
</template>

<script>
import { useStore } from 'vuex';
import VoronoiBackground from "@/components/VoronoiBackground.vue";
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";
import Posts from "@/components/AppPosts.vue";
//import Login from "/AppLogin.vue"
//import Home from "/AppIndex.vue"

export default {
  components: {
    VoronoiBackground,
    Header,
    Footer,
    Posts,
    //Login,
    //Home
  },
  mounted() {
    const store = useStore();  // Access Vuex store
    store.dispatch('fetchPosts');  // Dispatch the fetchPosts action when the component is mounted
  },
};
</script>

<style src="@/assets/index_style.css">
/* Move your existing CSS here */
</style>
