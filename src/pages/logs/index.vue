<template>
  <view>
    <p class="state-txt">很抱歉的通知您，由于外部原因，之前的接口已关闭，给您带来还请谅解！</p>
    <!-- <button open-type="contact" >联系</button> -->
  </view>
</template>

<script>
// import { formatTime } from '@/utils/index'
// import card from '@/components/card'

export default {
  components: {
    // card
  },

  data () {
    return {
      logs: []
    }
  },
  created () {
  }
}
</script>

<style>
.state-txt{
    text-align: center;
    margin-top: 50px;
}
</style>
