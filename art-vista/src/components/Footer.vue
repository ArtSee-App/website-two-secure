<!-- src/components/Footer.vue -->
<template>
  <footer>
    <p>&copy; 2025 Vista Technologies BV</p>
    <ul>
      <li><router-link to="/terms">Terms and Conditions</router-link></li>
      <li><a href="https://www.linkedin.com/company/artvista-app/" target="_blank"
          rel="noopener noreferrer">LinkedIn</a></li>
      <li><a href="https://www.instagram.com/artvista.app/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
/* Footer Container */
footer {
  margin-top: 50px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  /* Optional: Add a background color for better contrast */
}

/* Navigation Links Container */
ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Individual Navigation Links */
li {
  margin-left: 20px;
}

/* Navigation Links Styling */
a,
.router-link-active,
.router-link-exact-active {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

a:hover,
.router-link-active:hover,
.router-link-exact-active:hover {
  color: #1D88F0;
  /* Example hover color */
}

/* Media Queries for Responsive Design */

/* Mobile View: 768px and below */
@media screen and (max-width: 768px) {
  footer {
    /* Keep items in a row and allow wrapping if necessary */
    flex-wrap: wrap;
    justify-content: center;
    /* Center the content horizontally */
    padding: 15px 0;
  }

  footer p {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  ul {
    flex-wrap: wrap;
    /* Allow items to wrap if necessary */
    justify-content: center;
    /* Center the items */
    margin-top: 0;
    /* Remove top margin */
  }

  li {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    /* Add bottom margin for spacing when wrapping occurs */
  }

  a,
  .router-link-active,
  .router-link-exact-active {
    font-size: 14px;
    /* Make text smaller */
  }
}
</style>
