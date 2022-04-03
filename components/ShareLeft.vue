<template>
  <div class="share-left">
    <a href="/"><h1 class="header-left">SHARE</h1></a>
    <div class="link">
      <img class="image" src="home.png">
      <a href="/">ホーム</a>
    </div>
    <div class="link">
      <img class="image" src="logout.png">
      <a href="/login" @click="logout">ログアウト</a>
    </div>
    <h6 class="share">シェア</h6>
    <textarea name="" id="" cols="40" rows="7" class="text"></textarea>
    <div class="share-button">
       <button @click="share">シェアする</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/')
        })
    },
  },
};
</script>

<style>
.share-left {
  width: 100%;
}
.header-left {
  font-size: 24px;
}
.link {
  padding: 10px 0;
}
.image {
  width: 20px;
}
.share {
  padding: 10px 0;
}
.text {
  width: 100%;
  background: black;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
}
.share-button {
  padding-top: 20px;
  text-align: right;
}
</style>
