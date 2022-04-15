// 日本語化できるようインポート
import 'dayjs/locale/ja'
import Vue from 'vue'
import dayjs from 'dayjs'

// 日本語化設定
dayjs.locale('ja')

// momentをdayjsに置換するだけ
Vue.filter('format-date', function (value) {
  const date = dayjs(value);
  return date.format("YYYY.MM.DD(ddd) hh:mm:ss");
})
