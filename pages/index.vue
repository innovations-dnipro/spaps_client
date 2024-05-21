<template>
  <div class="s-home">
    <div class="s-home-container-one">
      <div class="s-home-container-one-block-one">
        <div class="s-home-container-one-block-one-layer-one">
          <div class="s-home-container-one-city-block">
            <span>Миколаїв...</span>
          </div>
          <SaunaSearch />
        </div>
        <div class="s-home-container-one-block-one-layer-two">
          <div class="s-home-container-one-settings">
            <i class="ph ph-sliders-horizontal"></i>
          </div>
          <div class="s-home-spa-select-container">
            <SpaSelect />
          </div>
        </div>
      </div>
      <div class="s-home-container-one-video-block">
        <img
          src="/bush_and_foam.gif"
          alt="bush and foam"
          width="328"
          height="200"
        />
      </div>
    </div>
    <div class="s-home-container-two">
      <div class="s-home-container-two-column-one">
        <img src="/home_pools.png" alt="swimming_pools" />
      </div>
      <div class="s-home-container-two-column-two">
        <img src="/home_spa_centers.png" alt="spa_centers" />
      </div>
      <div class="s-home-container-two-column-three">
        <div class="s-home-container-two-column-three-block-one">
          <img src="/home_cottages.png" alt="spa_centers" />
        </div>
        <div class="s-home-container-two-column-three-block-two">
          <img src="/home_baths.png" alt="spa_centers" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

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
