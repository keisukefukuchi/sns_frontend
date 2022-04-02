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
      <h1 class="register-head">新規登録</h1>
      <input v-model="name" type="name" required class="name"/>
      <br />
      <input v-model="email" type="email" required class="email"/>
      <br />
      <input v-model="password" type="password" required class="password"/>
      <br />
      <button @click="register">新規登録</button>
    </div>
  </div>
</template>

<script>
import firebase from '../plugins/firebase'


export default {
  data() {
    return {
      name:null,
      email:null,
      password:null
    }
  },
  methods: {
    register() {
      if (!this.name || !this.email || !this.password) {
        alert('ユーザーネームまたはメールアドレス、パスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/login')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
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
