<!--
 * @Date: 2019-11-20 11:57:08
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-22 19:52:16
 -->
<template>
  <view>
    <van-dialog id="van-dialog" confirmButtonColor="#1aaf5d" />
     <van-notify id="van-notify" />
    <view class="collect_box_panel" v-for="(item,index) in collectList" :key="item.collect_id">
      <view class="collect_box_panel_header">
        <div class="title">
          <div class="title-info">{{item.origin.title}}</div>
          <div class="title-info">{{item.origin.author}}</div>
        </div>
        <div>
          <van-icon class="delete" color="red" :size="size" name="delete" @click="deleteHandle(item._id,index)" />
          <van-icon :size="size" color="#1AAF5D" name="share" @click="shareHandle(item._id)" />
        </div>
      </view>
      <view class="collect_box_panel_content">
        <span v-for="(list,key) in item.origin.content" :key="key">{{list}}</span>
      </view>
      <view class="collect_box_panel_foot"></view>
    </view>
    <!-- <img :src="shareImage" class="share-image" />
    <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
    <button @click="eventDraw" class="btn">绘制</button>
    <button @click="eventSave" class="btn">保存到本地</button> -->
  </view>
</template>
<script>
import Dialog from "../../../static/vant/dialog/dialog";
import Notify from "../../../static/vant/notify/notify";
const db = wx.cloud.database();
export default {
  components: {
    // card
  },
  data() {
    return {
      logs: [],
      size: "20px",
      collectList:[],
       shareImage: '',
      painting: {}
    };
  },
  created() {},
  mounted() {
    this.getAllData()
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    this.getAllData()
  },
  methods: {
    getAllData(){
      wx.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        let { openid } = res.result;
        this.getCollectData(openid);
      });
    },
    deleteHandle(id,index) {
      console.log(id,index);
      Dialog.confirm({
        title: "提醒",
        message: "确定删除该收藏吗？",
        asyncClose: true
      })
        .then(() => {
          console.log('delete',id)
          this.deleteSelectCollect(id,index);
        })
        .catch(() => {
          Dialog.close();
        });
    },
    shareHandle(e) {
      console.log("e", e);
    },
    /**
     * @description: 获取收藏数据
     * @param {type}
     * @return:
     */
    getCollectData(id) {
      let _this = this
      db.collection("collect")
        .where({
          _openid: id
        })
        .get({
          success: function(e) {
            console.log(e.data);
           wx.stopPullDownRefresh()
            _this.collectList = e.data
          }
        });
    },
    /**
     * @description: 删除所选的收藏
     * @param {type}
     * @return:
     */
    deleteSelectCollect(id,index) {
      console.log(id,index)
      let _this =this
      db
        .collection("collect")
        .doc(id)
        .remove({
          success: function(e) {
             Dialog.close();
             _this.collectList.splice(index,1)
             Notify({ type: "primary", message: "删除成功", background: "#1aaf5d" });
          },
          fail: function() {
             Notify({ type: 'danger', message: '删除失败' });
          }
        });
    },
     eventGetImage (event) {
      console.log(event)
      wx.hideLoading()
      this.shareImage = event.target.tempFilePath
    },
    eventDraw () {
      wx.showLoading({
        title: '绘制分享图片中',
        mask: true
      })
      this.painting = {
        width: 375,
        height: 555,
        clear: true,
        views: [
          // {
          //   type: 'image',
          //   url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
          //   top: 0,
          //   left: 0,
          //   width: 375,
          //   height: 555
          // },
          // {
          //   type: 'image',
          //   url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',
          //   top: 27.5,
          //   left: 29,
          //   width: 55,
          //   height: 55
          // },
          // {
          //   type: 'image',
          //   url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
          //   top: 27.5,
          //   left: 29,
          //   width: 55,
          //   height: 55
          // },
          {
            type: 'text',
            content: '您的好友【kuckboy】',
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 33,
            left: 96,
            bolder: true
          },
          {
            type: 'text',
            content: '发现一件好货，邀请你一起0元免费拿！',
            fontSize: 15,
            color: '#563D20',
            textAlign: 'left',
            top: 59.5,
            left: 96
          },
          // {
          //   type: 'image',
          //   url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
          //   top: 136,
          //   left: 42.5,
          //   width: 290,
          //   height: 186
          // },
          // {
          //   type: 'image',
          //   url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
          //   top: 443,
          //   left: 85,
          //   width: 68,
          //   height: 68
          // },
          {
            type: 'text',
            content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
            fontSize: 16,
            lineHeight: 21,
            color: '#383549',
            textAlign: 'left',
            top: 336,
            left: 44,
            width: 287,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: '￥0.00',
            fontSize: 19,
            color: '#E62004',
            textAlign: 'left',
            top: 387,
            left: 44.5,
            bolder: true
          },
          {
            type: 'text',
            content: '原价:￥138.00',
            fontSize: 13,
            color: '#7E7E8B',
            textAlign: 'left',
            top: 391,
            left: 110,
            textDecoration: 'line-through'
          },
          {
            type: 'text',
            content: '长按识别图中二维码帮我砍个价呗~',
            fontSize: 14,
            color: '#383549',
            textAlign: 'left',
            top: 460,
            left: 165.5,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 125
          }
        ]
      }
    },
    eventSave () {
      wx.saveImageToPhotosAlbum({
        filePath: this.shareImage,
        success (res) {
          wx.showToast({
            title: '保存图片成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
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
  margin-bottom: 40rpx;
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
.share-image {
  width: 600rpx;
  height: 888rpx;
  margin: 0 75rpx;
  border: 1px solid black;
}
</style>
