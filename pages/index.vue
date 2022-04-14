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
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="ProviderProps" rules="required|max:120">
          <textarea
            name=""
            id="text"
            cols="40"
            rows="7"
            class="text"
            v-model="newShare"
          ></textarea>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <div class="share-button">
          <button
            @click="insertContact"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
          >
            シェアする
          </button>
        </div>
      </validation-observer>
    </div>
    <div class="share-right">
      <h1 class="share-home">ホーム</h1>
      <ul class="lists">
        <li class="list-item" v-for="item in shareLists" :key="item.id">
          <p class="user_name_content">
            {{ item.user.name }} : {{ item.message }}
          </p>
          <button class="pb_like tooltip">
            <img
              @click="onLikeClick(item.id)"
              class="image like"
              src="heart.png"
            />
            <p class="like-num">{{ item.like_count }}</p>
          </button>
          <button class="pb_del tooltip">
            <img
              @click="deleteShare(item.id)"
              class="image del"
              src="cross.png"
            />
          </button>
          <span class="comment-text">コメント:</span>
          <button class="pb_detail tooltip">
            <img class="image comment" src="detail.png" />
            <span class="comment-text">コメントを見る</span>
          </button>
          <p class="post-time">{{ item.created_at }}</p>
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
      uid: "",
      post_id: null,
    };
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
          alert("ログアウトが完了しました");
          this.$router.replace("/");
        });
    },
    getUid() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
        }
      });
    },
    async getContact() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/post/"
      );
      this.shareLists = resData.data.data;
      console.log(resData);
    },
    async insertContact() {
      await firebase.auth().onAuthStateChanged((user) => {
        const uid = user.uid;
        const sendData = {
          message: this.newShare,
          uid: uid,
        };
        console.log(sendData);
        this.$axios.post("http://127.0.0.1:8000/api/v1/post/", sendData);
      });
      this.getContact();
    },
    async deleteShare(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/post/" + id);
      this.getContact();
    },
    async onLikeClick(post_id) {
      const sendData = {
        uid: this.uid,
        post_id: post_id,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8000/api/v1/like/", sendData);
      this.getContact();
    },
  },
  created() {
    this.getContact();
    this.getUid();
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
.pb_like,
.pb_del,
.pb_detail {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 10px;
}
.like,
.del,
.comment {
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
.lists {
  height: 500px;
  overflow: scroll;
}
.error {
  color: red;
}
</style>

