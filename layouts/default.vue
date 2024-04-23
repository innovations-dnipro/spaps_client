<template>
  <div class="s-global-container">
    <MainHeader />
    <main class="s-main">
      <div />
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>
  </div>
</template>

<style scoped>
.s-global-container {
  display: grid;
  grid-template-rows: 84px 1fr auto;
  min-height: 100vh;
  background: #f5f7f9;
}
.s-main {
  height: calc(100% - 84px);
}
</style>
