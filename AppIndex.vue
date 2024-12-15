<template>
  <div class="voronoi">
    <VoronoiBackground />
    <div class="container">
      <Header />
      <button  @click="Logout" class="logout_btn">Logout</button>
        <main class="main-content">   

          <Posts />
       
        </main>
        <button @click="deletePosts" class="logout_btn">Delete all posts</button>
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
import auth from "@/auth";
//import Login from "/AppLogin.vue"
//import Home from "/AppIndex.vue"

export default {
  data() {
      return {
        authResult: auth.authenticated()
      };
    },
    
  components: {
    VoronoiBackground,
    Header,
    Footer,
    Posts,
    //Login,
    //Home
  },

  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include',
      })

      
      .then((response) => {
        response.json();
      })


      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })


      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },

    deletePosts() {
      fetch('http://localhost:3000/api/posts', {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => console.log(data)) // Logs deleted posts
        .catch(error => console.error('Error:', error));
        location.assign("/");
    }
  },


  mounted() {
    const store = useStore();  //access Vuex store
    store.dispatch('fetchPosts');  //dispatch the fetchPosts action when the component is mounted
  },


};



</script>
<style src="@/assets/index_style.css">
</style>
