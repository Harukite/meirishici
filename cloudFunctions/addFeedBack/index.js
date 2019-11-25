/*
 * @Date: 2019-11-25 20:05:02
 * @Author: xiazhengchun
 * @LastEditTime: 2019-11-25 20:21:34
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  let {desc} = event
  // 先取出集合记录总数
  const countResult = await db.collection('feedback').add({
    desc
  })
  console.log(countResult)
//   return {
//     data: countResult,
//     errMsg: countResult
//   }
}
