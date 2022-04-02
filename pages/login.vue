<template>
  <div class="register">
    <div class="header">
      <a href="/"><h1 class="header-left">SHARE</h1></a>
      <div class="header-link">
        <NuxtLink to="/register" class="link-register">新規登録</NuxtLink>
        <NuxtLink to="/login" class="link-login">ログイン</NuxtLink>
      </div>
    </div>

    <div class="new-form">
      <h1 class="register-head">ログイン</h1>
      <input v-model="email" type="email" required class="email"/>
      <br />
      <input v-model="password" type="password" required class="password"/>
      <br />
      <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>
<style>
body {
  max-width: 1080px;
  height: 100%;
  background-color: black;
  color: white;
  margin: 0 auto;
}
.header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  line-height: 70px;
  margin-bottom: 100px;
}
.header-left {
  font-size: 24px;
}
.link-register{
  padding: 0 20px;
}
.new-form {
  width: 500px;
  text-align: center;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
}
.register-head {
  font-size: 24px;
  color: black;
  margin-bottom: 20px;
}
.new-form input {
  width: 400px;
  height: 40px;
  margin-bottom: 20px;
}
</style>
