<template>
    <header class="header">
        <h2>
            <a href="/Index" class="home_btn">Home</a> | 
            <a href="/Login" class="new_post_btn">Login</a>
        </h2>
        <div class="profile">
            <div class="dropdown" v-show="dropdownVisible" id="profileDropdown">
                <p>Bananimus Maximus</p>
                <p>bricked@gmail.com</p>
                <p @click="logout">Logout</p>
            </div>
            <a href="#" @click="toggleDropdown">
                <img src="@/assets/images/banana_profile.png" alt="Profile" class="profile-icon" />
            </a>
        </div>
    </header>
</template>
  
<script>
export default {
    data() {
        return {
            dropdownVisible: false, // Manage dropdown visibility state
        };
    },
    methods: {
        toggleDropdown(event) {
            this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
        },
        closeDropdown(event) {
        // Close dropdown if clicking outside
            if (!event.target.closest(".profile")) {
            this.dropdownVisible = false;
            }
        },
        logout() {
            window.location.href = "/login";
        },
    },
    mounted() {
    // Attach a click listener to the window to detect outside clicks
        window.addEventListener("click", this.closeDropdown);
    },
    beforeUnmount() {
    // Clean up the event listener
        window.removeEventListener("click", this.closeDropdown);
    },
};
</script>
  
<style scoped src="@assets/header_style.css">
/* Header-specific styles */
</style>
  