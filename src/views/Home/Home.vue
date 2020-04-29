<template>
  <div class="home">
    <Carousel autoplay v-model="value2" loop dots="outside">
      <CarouselItem>
        <img alt="Vue logo" src="../../assets/1.png" />
      </CarouselItem>
      <CarouselItem>
        <img alt="Vue logo" src="../../assets/2.png" />
      </CarouselItem>
      <CarouselItem>
        <img alt="Vue logo" src="../../assets/3.png" />
      </CarouselItem>
      <CarouselItem>
        <img alt="Vue logo" src="../../assets/4.png" />
      </CarouselItem>
      <CarouselItem>
        <img alt="Vue logo" src="../../assets/5.png" />
      </CarouselItem>
      <CarouselItem>
        <img alt="Vue logo" src="../../assets/6.png" />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<style>
.home {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-size: 20px;
  padding: 30px;
}
/* #nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #ff6a00;
} */
</style>