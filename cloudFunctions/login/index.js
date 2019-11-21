/*
 * @Date: 2019-11-21 17:03:06
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-21 17:08:46
 */
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async () => {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}
