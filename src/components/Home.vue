<template>
  <div class="home">
    <div class="home__logo">
      <img src="../assets/logo.png" alt="" srcset="" class="center" />
    </div>
    <div class="home__info">
      <span class="home__info--text">NPLAN</span>
      <span class="home__info--text">Sri Lanka＿Japan SAMPLE</span>
      <span class="home__info--text font--light">Created by nplan (NPLAN)</span>
      <button class="button" @click="onEnter">access as guest</button>
    </div>
    <div class="footer">
      <span class="footer__item">Sign up</span>
      <span class="footer__item">Help center</span>
    </div>
  </div>
</template>

<script>
export default {
 methods:{
   onEnter(){
     this.$router.push('/panel')
   }
 }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* background-color: aquamarine; */
  justify-content: space-between;
  /* align-items: center; */
  height: 100vh;
}

.home__logo {
  display: flex;
  flex-basis: 100%;
  align-self: flex-start;
  text-align: center;
  /* background-color: teal; */

  /* justify-content: center; */
  /* align-items: center; */
}
.home__info {
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* flex: 1; */
}
.home__info--text {
  font-size: 1.5rem;
  font-weight: bold;
}
.footer {
  flex-basis: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2rem;

  /* background-color: lawngreen; */
}

.footer__item {
  margin: 1rem;
}
.center {
  /* text-align: center; */
  margin: 0 auto;
  margin-top: 1rem;
}

.font--light {
  font-weight: 400;
  color: gray;
}

.button {
  color: white;
  background-color: #107fc9;
  text-transform: uppercase;
  padding: 1rem;
  margin-top: 1rem;
  border: 0;
}
</style>