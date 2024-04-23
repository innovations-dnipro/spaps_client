<script setup lang="ts"></script>
<template>
  <PageWrapper>
    <template #content>
      <main>
        <section id="section1">
          <services-block />
        </section>
        <section id="section2">
          <projects-block />
        </section>
        <section id="section3">
          <technologies-block />
        </section>
        <section id="section4">
          <clients-block />
        </section>
        <section id="section5">
          <choose-technology />
        </section>
        <section id="section6">
          <contact-form />
        </section>
      </main>
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
section {
  height: 100vh;
  overflow: hidden;

  @media (max-width: 640px) {
    height: fit-content;
  }
}
#section2,
#section3,
#section4 {
  height: fit-content;
}
</style>
