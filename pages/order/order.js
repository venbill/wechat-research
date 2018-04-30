// mine.js
var app = getApp()
Page({
    data: {
        orders:[]
    },
    onLoad: function() {

        var _this= this;
        app.getUserInfo(function (userInfo) {
           



        wx.request({
            url: getApp().globalData.serverUrl+'order-records/my/'+userInfo.openId,
            header: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            success: function(res) {
                res.data.data.forEach(e => {
                    console.log(e)
                    e.createTime = e.createTime.toString().substring(0,10)
                
                });
                console.log(res.data.data)
                _this.setData({
                    orders: res.data.data
                  })

        }})



        })




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
