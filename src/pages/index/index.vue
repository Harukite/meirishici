<template>
  <div class="container">
    <!-- <collect  /> -->
    <van-notify id="van-notify" />
    <div v-show="hasData">
      <div class="desc">{{desc}}</div>
      <p class="match-tags">
        <span v-for="(item , key) in matchTag" :key="key">{{item}}</span>
      </p>
      <div v-show="hasData">
        <p class="state-txt">(根据时间、地点、天气、事件智能推荐)</p>
        <button class="refresh-btn" @click="_refresh">换一个</button>
      </div>
      <h3 class="origin" @click="readOrgin">{{originBtn}}</h3>
      <div v-show="showOrigin" class="content">
        <h1>{{title}}</h1>
        <h3>{{author}} —{{dynasty}}</h3>
        <ul>
          <li v-for="(item , key) in content" :key="key">
            <text>{{item}}</text>
          </li>
        </ul>
        <div v-show="translate && translate.lenght>0">
          <h3>译文：</h3>
          <ul>
            <li v-for="(item,key) in translate" :key="key">
              <text>{{item}}</text>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="!hasData">
      <card text="出了点小状况，请稍后再试！" />
    </div>
    <div class="collect_icon" @click="checkIfCollected">
      <img class="collect_img" src="../../components/collect.png" />
    </div>
  </div>
</template>
<script>
import card from "@/components/card";
// import collect from "@/components/collect";
import jinrishici from "@/utils/jinrishici";
import Notify from "../../../static/vant/notify/notify";
const db = wx.cloud.database()
export default {
  data() {
    return {
      matchTag: [],
      content: [],
      author: "",
      dynasty: "",
      translate: [],
      title: "",
      hasData: true,
      desc: "",
      showOrigin: false,
      animationData: {},
      originBtn: "查看出处",
      context:null,
      collectData:null
    };
  },

  components: {
    card,
    // collect
  },

  methods: {
    /****
     * 刷新诗词
     */
    _refresh() {
      this.loadSentence();
    },
    /****
     * 获取诗词数据
     */
    async loadSentence() {
      let vm = this;
      // return;
      mpvue.showLoading({
        title: "加载中"
      });
      await jinrishici.load(
        result => {
          mpvue.hideLoading();
          let { status, data } = result;
          switch (status) {
            case "success":
              let { origin, matchTags, content } = data;
              vm.collectData = data
              vm.desc = content;
              vm.matchTag = matchTags;
              vm.hasData = true;
              vm.transOrgin(origin);
              break;
            default:
              vm.hasData = false;
              break;
          }
        },
        err => {
          mpvue.hideLoading();
          vm.hasData = false;
        }
      );
    },
    readOrgin() {
      this.showOrigin = !this.showOrigin;
      this.originBtn = this.showOrigin ? "收起出处" : "查看出处";
    },
    transOrgin(origin) {
      let { author, dynasty, translate, title, content } = origin;
      this.content = content;
      this.author = author;
      this.dynasty = dynasty;
      this.translate = translate;
      this.title = title;
    },
    /**
     * @description: 收藏该诗词
     * @param {type} 
     * @return: 
     */
    collectHandle({id, content, origin}) {
    
      db.collection('collect').add({
        data:{
              collect_id:id,
              content,
              origin
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            Notify({ type: "primary", message: "收藏成功", background: "#1aaf5d" });
          },
          fail: function() {
            Notify({ type: 'danger', message: '收藏失败' });
          }
      })
    },
    /**
     * @description: 确认是否收藏过该诗词
     * @param {type} 
     * @return: 
     */
    checkIfCollected(){
        let {id ,content,origin} = this.collectData;
        let _this= this
        db.collection("collect").where({
          collect_id:id
        }).get({
          success:function(res){
              console.log(res.data)
              let {data} = res
              if(data.length>0){
                Notify({ type: 'warning', message: '你已收藏过该诗词！' });
              }else{
                _this.collectHandle({id, content, origin})
              }
          }
        })

    }
  },
  created() {
    // this.checkIfCollected()
    let app = getApp();
    wx.cloud.callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        this.context= res.result
      })
  },
  mounted() {
    this.loadSentence();
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          console.log(res);
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  }
};
</script>

<style scoped lang='less'>
@color: #1aaf5d;
.state-txt {
  font-size: 25rpx;
  text-align: center;
}
.match-tags {
  text-align: center;
  span {
    font-size: 12px;
    border-radius: 20px;
    height: 15px;
    line-height: 15px;
    display: inline-block;
    border: 1px solid @color;
    padding: 0 10px;
    color: @color;
    margin: 0 5px;
  }
}
.desc {
  text-align: center;
  margin: 0 10px;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx auto;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
}
.userinfo-nickname {
  color: #aaa;
  text-align: center;
}
.content {
  text-align: center;
  margin-top: 10px;
  h1 {
    font-size: 18px;
    font-weight: 500;
  }
  h3 {
    font-size: 25rpx;
  }
  p {
    font-size: 12px;
  }
}
.origin {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
  color: @color;
}
.refresh-btn {
  margin-top: 10px;
  border-radius: 30px;
  line-height: 30px;
  background: @color;
  width: 100px;
  height: 30px;
  color: #fff;
}
ul {
  margin: 0 10px;
}
.collect_icon {
  position: fixed;
  top: 80rpx;
  right: 0;
  padding: 10rpx 20rpx 10rpx 30rpx;
  color: #fff;
  background: @color;
  border: 1rpx solid @color;
  border-right-width: 0;

  border-top-left-radius: 60rpx;
  border-bottom-left-radius: 60rpx;

  .collect_img {
    width: 30rpx;
    height: 30rpx;
  }
}
</style>
