<template>
  <div class="container">
  <header>
    <!-- Header content -->
    <slot name="header"><h1>Header</h1></slot>
  </header>

  <nav>
    <!-- Navigation -->
    <slot name="nav"><h2>Nav</h2></slot>
  </nav>

  <main>
    <!-- Main content -->
    <slot></slot>
  </main>

  <aside>
    <!-- Sidebar / Ads -->
    <slot name="side"><h2>side</h2></slot>
  </aside>

  <footer>
    <!-- Footer content -->
    <slot name="footer"><h3>footer</h3></slot>
  </footer>
</div>
</template>

<script>
export default {
  name: "layout"
};
</script>

<style scoped>
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "nav footer side";

  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;

  height: 100vh;
}
header {
  grid-area: header;
}

nav {
  grid-area: nav;
  margin-left: 0.5rem;
}

main {
  grid-area: content;
  overscroll-behavior: contain;
}

aside {
  grid-area: side;
  margin-right: 0.5rem;
}

footer {
  grid-area: footer;
  display: flex;
}
@media (max-width: 768px) {
  .container {
    grid-template-areas:
      "header"
      "nav"
      "content"
      "side"
      "footer";

    grid-template-columns: 1fr;
    grid-template-rows:
      auto /* Header */
      minmax(75px, auto) /* Nav */
      1fr /* Content */
      minmax(75px, auto) /* Sidebar */
      auto; /* Footer */
  }

  nav,
  aside {
    margin: 0;
  }
}
</style>
