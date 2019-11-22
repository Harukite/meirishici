<!--
 * @Date: 2019-11-21 16:48:00
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-22 19:44:30
 -->
<template>
  <div class="mine">
    <!-- <div>
      <div class="avatar-box">
          <img class="img" src="../../components/collect.png" alt />
      </div>
      <view class="nickname">夏天的味道</view>
    </div> -->
    <div>
      <van-grid clickable column-num="2">
        <van-grid-item
          link-type="navigateTo"
          url="/pages/collect/main"
          text="收藏"
        >
          <view slot="icon">
             <img class="icon" src="../../images/collect.png" alt="">
          </view>
        </van-grid-item>
        <van-grid-item
          link-type="navigateTo"
          url="/pages/dashboard/main"
          text="反馈"
        >
          <view slot="icon">
            <img class="icon" src="../../images/feedback.png" alt="">
          </view>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "mine",
  data() {
    return {};
  },
  mounted() {
   console.log( wx.getUserInfo())
  },
};
</script>

<style lang="less" scoped>
.mine {
  .nickname{
    line-height: 2;
    text-align: center;
  }
  .avatar-box{
    width:100%;
    height: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    .img{
      width: 100rpx;
      height: 100rpx;
      background: #000;
      border-radius: 50%;
    }
  }
  
  .icon{
    width: 60rpx;
    height:60rpx;
  }
}
</style>