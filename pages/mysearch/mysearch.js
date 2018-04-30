var app = getApp()
Page({
    data: {
        researchList: {},
    },



    queryMySearch: function () {
        var _this = this




        app.getUserInfo(function (userInfo) {

            wx.request({
                url: getApp().globalData.serverUrl + 'researchs/my',
                header: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: { "openId": userInfo.openId },
                success: function (res) {
                    res.data.data.forEach(e => {
                        console.log(e)
                        e.createTime = e.createTime.toString().substring(0, 10)

                    });
                    _this.setData({
                        researchList: res.data.data
                    })

                },
            })




        })



    },
    onLoad: function () {
        this.queryMySearch();


    },
    toQuestion: function (event) {
        console.log(event)
        wx.redirectTo({
            url: '../question/question?id=' + event.currentTarget.dataset.id,
        });
    },
    toReceive: function (event) {
        wx.redirectTo({
            url: '../receive/receive?id=' + event.currentTarget.dataset.id,
        });
    }



})
