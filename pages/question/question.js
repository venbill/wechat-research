var app = getApp()
Page({
    data: {
        researchId: 0,
        questionList: [],
        basicInfo: {},
        answers: []
    },



    getBasicInfo: function () {
        var _this = this
        app.getUserInfo(function (userInfo) {
            wx.request({
                url: getApp().globalData.serverUrl + 'research/' + _this.data.researchId + '/' + userInfo.openId,
                header: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                success: function (res) {
                    console.log(res.data)
                    _this.setData({
                        basicInfo: res.data
                    })

                },
            })



        })


    },

    getQuestionList: function () {
        var _this = this
        var _this = this
        app.getUserInfo(function (userInfo) {


            wx.request({
                url: getApp().globalData.serverUrl + 'research/questions',
                header: {
                    'Content-Type': 'application/json'
                },
                data: { "researchId": _this.data.researchId, "openId": userInfo.openId },
                method: 'POST',
                success: function (res) {
                    _this.setData({
                        questionList: res.data.data
                    })

                },
            })

        })

    },




    saveAnswer: function (event) {
        var _this = this;
        var v = event.detail.value;
        var strs = new Array();
        strs = v.split(",");
        var key = strs[0];
        var value = strs[1];
        var exist = false;
        var answerList = _this.data.answers;
        for (var i = 0; i < answerList.length; i++) {
            if (answerList[i].indexOf(key + ',') >= 0) {
                exist = true;

                answerList[i] = v;
                _this.setData({
                    answers: answerList
                })
            }
        }
        if (!exist) {
            answerList.push(v);
            _this.setData({
                answers: answerList
            })
        }


        console.log(_this.data.answers)


    },

    onLoad: function (option) {
        this.data.researchId = option.id;
        this.getBasicInfo();
        this.getQuestionList();

    },
    commit: function () {
        var _this = this;

        if (this.data.answers.length != this.data.questionList.length) {
            // wx.showToast({
            //     title: '请全部填写完成再提交',
            //     icon: 'loading',
            // loading/success
            //     duration: 1000,
            //     mask:false
            // })


            wx.showModal({
                title: '提示',
                content: '请全部填写完成再提交',
                success: function (res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                    } else {
                        // console.log('用户点击取消')
                    }

                }
            })
        } else {
            //提交

            app.getUserInfo(function (userInfo) {



                wx.request({
                    url: getApp().globalData.serverUrl + 'commit/answer',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    data: { "researchId": _this.data.researchId, "openId": userInfo.openId, "answerList": _this.data.answers },
                    success: function (res) {
                        if (res.data.code == 200) {
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success',
                                duration: 1000,
                                mask: false
                            })
                            _this.data.basicInfo.answered=true;
                            _this.setData({
                                basicInfo:_this.data.basicInfo
                            })
                        }
                        else {
                            wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                success: function (res) {
                                    if (res.confirm) {
                                        // console.log('用户点击确定')
                                    } else {
                                        // console.log('用户点击取消')
                                    }

                                }
                            })



                        }

                    },
                }
                )




            })





        }

    }






})
