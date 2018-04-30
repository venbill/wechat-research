var app = getApp()
Page({
    data: {
        researchList: {},
        search: ""
    },


    search: function (e) {
        this.data.search = e.detail.value;

        this.querySearch();
    },
    querySearch: function () {
        var _this = this

        app.getUserInfo(function (userInfo) {

            wx.request({
                url: getApp().globalData.serverUrl + 'researchs',
                header: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: { "name": _this.data.search, "openId": userInfo.openId },
                success: function (res) {
                    console.log(res.data.data)
                    _this.setData({
                        researchList: res.data.data
                    })

                },
            })





        })





    },
    onLoad: function () {
        this.querySearch();


    },
    onShow: function () {
        this.querySearch();
    },

    toQuestion: function (event) {
        console.log(event)
        wx.navigateTo({
            url: '../question/question?id=' + event.currentTarget.dataset.id,
        });
    },
})
