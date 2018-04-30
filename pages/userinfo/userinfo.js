// mine.js
var app=getApp()
Page({
    data: {
        userInfo: {
           openId:'',
            name: '',
            tel: ''
        },
        from: ''


    },
    onLoad: function (option) {
        console.log('option--->')
        console.log(option)
        if (option.from) {
            this.setData({
                from: option.from
            })
        }
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
            console.log(that.data.userInfo)
        })






    },
    onShow: function () {
        console.info("show")
    },
    loadProfile: function (e) {

    },



    formSubmit: function (e) {
        console.log(e.detail.value.name)
        console.log(e.detail.value.tel)
        var name = e.detail.value.name;
        var tel = e.detail.value.tel;
        var _this = this;


        if (name.length == 0) {

            wx.showToast({

                title: '姓名不能为空!',

                icon: 'loading',

                duration: 1000

            })
            return



        }




        if (tel.length == 0) {

            wx.showToast({

                title: '手机号不能为空!',

                icon: 'loading',

                duration: 1000

            })
            return



        }

        if (name.length > 10) {

            wx.showToast({

                title: '姓名超过10位!',

                icon: 'loading',

                duration: 1000

            })
            return

        }

        if (tel.length != 11) {

            wx.showToast({

                title: '手机号为11位!',

                icon: 'loading',

                duration: 1000

            })
            return



        }









        var openId = _this.data.userInfo.openId;



        if (openId == null) {
            return;
        }
        wx.request({
            url: getApp().globalData.serverUrl + 'we-users',
            header: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            data: { "name": name, "tel": tel, "openId": openId },
            success: function (res) {
                console.log(res.data)
                getApp().globalData.userInfo = _this.data.userInfo;

                wx.showToast({
                    title: '保存成功',
                    icon: 'success',

                    duration: 1000,
                    mask: false
                })
                if(_this.data.from=='index'){
                    wx.switchTab({
                        url: '../feeds/feeds',
                    });
                }


                


            },
        })
    }
},


)
