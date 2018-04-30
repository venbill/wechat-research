//feeds.js
//获取应用实例
var app = getApp()
Page({
    data: {
        hidden: true,
        motto: 'Hello World',
        userInfo: {},
        menus: [
          {
            "name": "调研",
            "link": "../search/search",
            "url": '../../img/menu/research.png'
          },
          {
            "name": "客服",
            "link": "../kefu/kefu",
            "url": '../../img/menu/kefu.png'
          },
          {
            "name": "我的",
            "link": "../mine/mine",
            "url": '../../img/menu/my.png'
          }
        ],

        feedList: [],
        imgUrls: [
          {
            link: '/pages/index/index',
            url: '../../img/banner/banner1.png'
          }, {
            link: '/pages/logs/logs',
            url: '../../img/banner/banner2.png'
          }, {
            link: '/pages/test/test',
            url: '../../img/banner/banner3.png'
          }
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000, 
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

   
    onLoad: function() {
        var that = this

















        
       
    },
    toTab: function(event){
        var link = event.currentTarget.dataset.link;
        if(link.indexOf('kefu')>=0){
            wx.navigateTo({
                url: link,
              }); 
        }else{
            wx.switchTab({
                url: link,
              });
        }
        
    },
    onPullDownRefresh: function() {
        console.info("被拉下了")
    },
    toPerson: function(e) {
        console.log(e)
        wx.navigateTo({
            url: '../person/person?master=' + e.target.dataset.master
        })
    },
    upper: function() {

    },
    lower: function() {
        console.log("到底啦")
        if (this.requestFlag === false) {
            this.requestFlag = true
            this.setData({
                hidden: false
            })
            var that = this
            setTimeout(that.getFeeds, 3000)
        }
    },
    requestFlag: false,
    getFeeds: function() {
        var that = this
        wx.request({
            url: 'http://elephstor.com/wxdev/stamp1206.json',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                that.requestFlag = false
                that.setData({
                    hidden: true
                })
                var feedsStrorage = wx.getStorageSync('feeds') || []
                feedsStrorage = feedsStrorage.concat(res.data)
                that.setData({
                    feedList: feedsStrorage
                })
                try {
                    wx.setStorageSync('feeds', feedsStrorage)
                } catch (e) {}
                console.log("同步成功啦")
            }
        })
    }
})
