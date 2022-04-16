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
      <h6 class="share">コメント</h6>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="ProviderProps" rules="required|max:120">
          <textarea
            name=""
            id="text"
            cols="40"
            rows="7"
            class="text"
            v-model="newComment"
          ></textarea>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <div class="share-button">
          <button
            @click="insertComment"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
          >
            コメントする
          </button>
        </div>
      </validation-observer>
    </div>
    <div class="share-right">
      <h1 class="share-home">コメント</h1>
      <ul>
        <li class="list-item">
          <p class="user_name_content">
            {{ userName }} : {{ message }}
          </p>
          <button class="pb_like tooltip">
            <img
              class="image like"
              src="heart.png"
            />
            <p class="like-num">{{ like_count }}</p>
          </button>
          <button class="pb_del tooltip">
            <img
              class="image del"
              src="cross.png"
            />
          </button>
        </li>
      </ul>
      <h3 class="comment-header">コメント欄</h3>
      <ul class="comment-lists">
        <li class="comment-list" v-for="item in commentLists" :key="item.id">
          <h6 class="comment-user">{{item.user.name}}</h6>
          <p class="comment">{{item.comment}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      id: this.$route.query.id,
      userName: this.$route.query.userName,
      message: this.$route.query.message,
      like_count: this.$route.query.like_count,
      newComment: "",
      commentLists: [],
      uid: "",
    };
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
    async getComment() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/comment/"
      );
      this.commentLists = resData.data.data;
      console.log(resData);
    },
    async insertComment() {
      const sendData = {
        comment: this.newComment,
        uid: this.uid,
        post_id: this.id,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8000/api/v1/comment/", sendData);
      location.reload();
      this.getComment();
    },
    async deleteComment(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/comment/" + id);
      this.getComment();
    },
    async onLikeClick(post_id) {
      const sendData = {
        uid: this.uid,
        post_id: post_id,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8000/api/v1/like/", sendData);
      this.getComment();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        alert("ログインしてください。");
        this.$router.replace("/login");
      }
    });
    this.getComment();
  },
};
</script>

<style>
body {
  max-width: 1280px;
  height: 100%;
  background: black;
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
.error {
  color: red;
}
.comment-header {
  text-align: center;
}
.comment-lists {
  height: 500px;
  overflow: scroll;
}
.comment-list {
  margin: 10px;
  padding: 10px;
  border: 1px solid white;
}
.comment-user {
  padding: 5px;
}
.comment {
  padding: 5px;
}
</style>
