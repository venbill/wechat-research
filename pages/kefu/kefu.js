// mine.js
var app = getApp()
Page({
    data: {
        userInfo: {},
        myProfile: [{ "desc": "我的奖品", "id": "coin" }, { "desc": "我的答卷", "id": "mysearch" }, { "desc": "我的地址", "id": "myHeared" }],
        myAccount: ["个人信息", "帮助", "奖品说明", "关于调研"]
    },
    onLoad: function() {
        
    },
    onShow: function() {
        console.info("show")
    },
    loadProfile: function(e) {
        console.log(e.target)
    },

    goto: function(event){
        console.log(event)
        var id = event.currentTarget.dataset.id; 
        wx.navigateTo({
            url: '../'+id+'/'+id,
          });
    },


})
