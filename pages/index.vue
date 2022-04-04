<template>
  <div class="container">
    <div class="share-left">
      <a href="/"><h1 class="header-left">SHARE</h1></a>
      <div class="link">
        <img class="image" src="home.png" />
        <a href="/">ホーム</a>
      </div>
      <div class="link">
        <img class="image" src="logout.png" />
        <a href="/login" @click="logout">ログアウト</a>
      </div>
      <h6 class="share">シェア</h6>
      <textarea name="" id="text" cols="40" rows="7" class="text" v-model="newShare"></textarea>
      <div class="share-button">
        <button @click="insertShare">シェアする</button>
      </div>
    </div>
    <div class="share-right">
      <h1 class="share-home">ホーム</h1>
      <ul>
          <li class="list-item" v-for="item in shareLists" :key="item.id">
              <p class="user_name_content">{{item.user.name}} : 内容</p>
              <button class="pb_like tooltip">
                <img class="image like" src="heart.png">
                <p class="like-num">1</p>
              </button>
              <button class="pb_del tooltip">
                <img class="image del" src="cross.png">
              </button>
              <span class="comment-text">コメント:</span>
              <button class="pb_detail tooltip">
                <img class="image comment" src="detail.png">
                <span class="comment-text">コメントを見る</span>
              </button>
              <p class="post-time">時間</p>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  props: [],
  data() {
    return {
      newShare: "",
      shareLists: [],

    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = "ログイン済みです";
      }
    });
  },
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
    async getContact() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/post/"
      );
      this.shareLists = resData.data.data;
      console.log(resData);
    },
    async insertShare() {
      await firebase.auth().onAuthStateChanged((user) => {
        if(user && this.newShare.length <= 120){
          const uid = user.uid
          const sendData = {
            message: this.newShare,
            uid:uid,
          };
          console.log(sendData);
          this.$axios.post("http://127.0.0.1:8000/api/post/", sendData);
        }else {
          alert("シェアは120文字以内にして下さい。")
        }
      })
      this.getContact();

    },
  },
};
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
  margin: 0 10px;
}
.share-home {
  font-size: 24px;
  margin: 10px;
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
.list-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid white;
}
.user_name_content {
  padding: 10px;
  font-size: 16px;
}
.pb_like,.pb_del,.pb_detail{
  background:none;
  border:0;
  cursor:pointer;
  padding: 10px;

}
.like,.del,.comment {
  width: 18px;
  vertical-align: middle;
}
.like-num {
  color: white;
  display: inline;
  font-size: 16px;
  padding: 10px 30px;
  margin-bottom: 10px;
  line-height: 0;
  vertical-align: middle;
}
.comment-text {
  font-size: 16px;
  vertical-align: middle;
}
.post-time {
  font-size: 16px;
  padding: 10px;
}
</style>
