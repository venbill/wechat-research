// mine.js
var app = getApp()
Page({
    data: {
        userInfo: {},
        name:'',
        myProfile: [{ "desc": "我的奖品", "id": "order" }, { "desc": "我的答卷", "id": "mysearch" }],
        myAccount: [{"desc":"个人信息","id":"userinfo"}, {"desc":"奖品说明","id":"explain"},{"desc": "关于调研","id":"about"}]
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        
    },
    onShow: function() {
        console.info("show")
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
       
    },
    loadProfile: function(e) {
        console.log(e.target)
        console.log(getApp().globalData)
    },

    goto: function(event){
        console.log(event)
        var id = event.currentTarget.dataset.id; 
        wx.navigateTo({
            url: '../'+id+'/'+id,
          });
    },


})
