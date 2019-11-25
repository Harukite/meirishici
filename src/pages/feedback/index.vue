<!--
 * @Date: 2019-11-25 19:14:59
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-25 20:39:58
 -->
<template>
  <div>
    <van-notify id="van-notify" />
    <div class="textArea-box">
      <van-field
        :value="message"
        @input="handleInput"
        type="textarea"
        placeholder="请输入反馈"
        autosize
        border
        input-class="sd"
        maxlength="200"
      />
      <!-- <textarea name="" id="" cols="30" rows="10" @bindinput="handleInput"></textarea> -->
      <van-button
        @click="feedback"
        size="large"
        custom-style="background:#1aaf5d;color:#fff;margin-top:50rpx;"
      >提交</van-button>
    </div>
  </div>
</template>
<script>
import Notify from "../../../static/vant/notify/notify";
const db = wx.cloud.database();
export default {
  name: "反馈",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    feedback() {
      console.log(this.message);
      if (this.message.length === 0) {
        Notify({ type: "danger", message: "请输入反馈内容" });
      } else {
        db.collection("feedback").add({
          data: {
            desc: this.message
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            Notify({
              type: "primary",
              message: "提交成功，感谢你的反馈！",
              background: "#1aaf5d",
              onClose:function(){
                wx.navigateBack({
                  delta: 1
                });
              }
            });
          }
        });
      }
    },
    handleInput(e) {
      console.log(e.mp.detail);
      this.message = e.mp.detail;
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.textArea-box {
  width: 100%;
  padding: 50rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  .sd {
    height: 200px;
  }
  .text-area {
    width: 100%;
    border: 1rpx solid #eee;
    border-radius: 10rpx;
    padding: 20rpx;
    box-sizing: border-box;
  }
}
</style>