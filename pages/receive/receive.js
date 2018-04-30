// mine.js
var app = getApp()
Page({
    data: {
        prize:{},
        researchId:0,
        userInfo:{}

    },
    onLoad: function(option) {
        this.data.researchId=option.id;
        var _this =this;
        wx.request({
            url: getApp().globalData.serverUrl+'research/prize/'+_this.data.researchId,
            header: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            success: function(res) {
                _this.setData({
                    prize: res.data.data
                  })

        }})





        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            _this.setData({
                userInfo: userInfo
            })
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















    formSubmit: function (e) {
        var param={openId:this.data.userInfo.openId,researchId:this.data.researchId,personName:e.detail.value.name,tel:e.detail.value.tel,address:e.detail.value.address}

        console.log(param)
        var _this = this;


        if (param.personName.length == 0) {

            wx.showToast({

                title: '收件人不能为空!',

                icon: 'loading',

                duration: 1000

            })
            return



        }




        if (param.tel.length == 0) {

            wx.showToast({

                title: '手机号不能为空!',

                icon: 'loading',

                duration: 1000

            })
            return



        }

        if (param.personName.length > 5) {

            wx.showToast({

                title: '姓名不能超过5位!',

                icon: 'loading',

                duration: 1000

            })
            return

        }

        if (param.tel.length != 11) {

            wx.showToast({

                title: '手机号为11位!',

                icon: 'loading',

                duration: 1000

            })
            return



        }
        if (param.address.length ==null||param.address.length==0) {

            wx.showToast({

                title: '收件地址不能为空!',

                icon: 'loading',

                duration: 1000

            })
            return



        }
        if (param.address.length > 50) {

            wx.showToast({

                title: '收件地址过长!',

                icon: 'loading',

                duration: 1000

            })
            return



        }


        wx.request({
            url: getApp().globalData.serverUrl + 'address/add',
            header: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: param,
            success: function (res) {
                if(res.data.code=='200'){
                    wx.showToast({
                        title: '订单提交成功',
                        icon: 'success',
    
                        duration: 1000,
                        mask: false
                    }) 

                    
                }else{
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        success: function (res) {
                        if (res.confirm) {
                        // console.log('用户点击确定')
                        }else{
                        // console.log('用户点击取消')
                        }
                         
                        }
                        })







                }

               
                    

            },
        })}











})
