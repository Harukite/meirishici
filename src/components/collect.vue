<!--
 * @Date: 2019-11-20 12:06:11
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-22 11:35:15
 -->
<template>
    <div class="collect_icon">
        <!-- <img class="collect_img" src="./collect.png" /> -->
    </div>
</template>
<script>
export default {
        props:{
            isCollected:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                
            }
        },
        created() {
            
        },
        methods: {
            // checkoutHandle(){
            //     if(this.isCollected){
            //         return 
            //     }
            // }
        },
}
</script>
<style lang="less">
    .collect_icon{
        position: fixed;
        top: 80rpx;
        right: 0;
        padding: 10rpx 20rpx 10rpx 30rpx;
        color: #fff;
        background: #1AAF5D;
        border: 1rpx solid #1AAF5D;
        border-right-width: 0;

        border-top-left-radius: 60rpx;
        border-bottom-left-radius: 60rpx;
        
        .collect_img{
            width: 30rpx;
            height: 30rpx;
        }
    }
</style>