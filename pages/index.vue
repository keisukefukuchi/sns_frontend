<template>
  <div class="container">
    <SahreLeft class="share-left"></SahreLeft>
    <div class="share-right">
      <h1 class="share-home">ホーム</h1>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import SahreLeft from '../components/ShareLeft.vue'
export default {
  components: {
    SahreLeft,
  },
  props:[
    
  ],
  data() {
    return {
      message: 'ログインができておりません',
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログイン済みです'
      }
    })
  },
}
</script>

<style>
body {
  max-width: 1280px;
  height: 100%;
  background-color: black;
  color: white;
  margin: 0 auto;
}
.container {
  width: 100%;
  display: flex;
  padding: 30px;
}
.share-left {
  width: 30%;
}
.share-right {
  width: 70%;
  margin-left: 20px;
}
.share-home {
  font-size: 24px;
  border: 1px solid white;
  padding: 10px;
}

</style>
