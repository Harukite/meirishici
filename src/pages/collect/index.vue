<!--
 * @Date: 2019-11-20 11:57:08
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-21 16:46:13
 -->
<template>
  <view>
    <van-dialog id="van-dialog" confirmButtonColor="#1aaf5d"/>
    <view class="collect_box_panel">
      <view class="collect_box_panel_header">
        <div class="title">
          <div class="title-info">岳阳楼记</div>
          <div class="title-info">123123</div>
        </div>
        <div>
          <van-icon class="delete" color="red" :size="size" name="delete" @click="deleteHandle(1)" />
          <van-icon :size="size" color="#1AAF5D" name="share" @click="shareHandle(1)" />
        </div>
      </view>
      <view
        class="collect_box_panel_content"
      >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio mollitia nulla animi dolore, fugiat reprehenderit et. At quae dolores eaque id enim voluptatem deserunt, mollitia, est magnam ipsam nihil. Dolor!</view>
      <view class="collect_box_panel_foot"></view>
    </view>
  </view>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  components: {
    // card
  },
  data() {
    return {
      logs: [],
      size:'20px'
    };
  },
  created() {},
  methods: {
    deleteHandle(e) {
      console.log(e);
      Dialog.confirm({
      title: '提醒',
      message: '确定删除该收藏吗？',
      asyncClose: true
    })
      .then(() => {
        setTimeout(() => {
          Dialog.close();
        }, 1000);
      })
      .catch(() => {
        Dialog.close();
      });
    },
    shareHandle(e){
      console.log('e', e)
    }
  }
};
</script>

<style lang="less">
.collect_box_panel {
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid #eee;
  position: relative;
  left: 10%;
  border-radius: 10rpx;
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
  &_header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 10rpx;
    border-bottom: 1px solid #eee;
     text-shadow: 0 2px white;
    .delete {
      margin-right: 20rpx;
    }
    .title {
      .title-info {
        &:nth-of-type(1) {
          font-size: 34rpx;
        }
        &:nth-of-type(2) {
          font-size: 24rpx;
        }
      }
    }
  }
  &_content {
    padding: 20rpx;
  }
}
</style>
