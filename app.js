//app.js
App({
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    onLaunch: function() {
        try {
            wx.clearStorageSync()
            this.getUserInfo()
        } catch (e) {}
    },
    getUserInfo: function(cb) {
        var _this = this;
        wx.login({
            //获取code
            success: function(res) {
                console.log('-->code')
            //    code = res.code //返回code
               console.log(res);
               //调用后端接口
               console.log('--->login get  openId')
               wx.request({
                url: getApp().globalData.serverUrl+'wechat/login/'+res.code,
                header: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                
                success: function(res) {

                    console.log(res.data.data)
                    var openId=res.data.data.openId;
                    var name= res.data.data.name;
                     var tel= res.data.data.tel;
                        wx.getUserInfo({
                            success: function(res) {
                                res.userInfo['openId']=openId;
                                res.userInfo['name']=name;
                                res.userInfo['tel']=tel;

                                _this.globalData.userInfo = res.userInfo
                                typeof cb == "function" && cb(_this.globalData.userInfo)
                            }
                        })


                        if(name==null||name==undefined||name==""){
                            console.log('--->redirect')

                                _this.toUserInfo()
                                
                           
                        }
                    },
                    }
                )
                


            }
          })



    },
    
    globalData: {
        userInfo: null,
        serverUrl:"https://research.yuwb.pub/api/"
        // serverUrl:"http://localhost:8080/api/"
       
    },
    toUserInfo:function(){
        wx.reLaunch({
            url: 'pages/userinfo/userinfo?from=index'
          })
        
    }





})
