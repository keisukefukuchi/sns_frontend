import Vue from 'vue'
import moment from 'moment'

// YYYY年MM月DD日形式で表示するようfilterを定義
Vue.filter('format-date', function (value) {
  const date = moment(value);
  return date.format("YYYY年MM月DD日");
})
