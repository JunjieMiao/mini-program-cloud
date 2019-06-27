// miniprogram/pages/menu/menu.js 
var app=getApp()
const Db = wx.cloud.database({ env: 'mininote-ledh1' });
const db = wx.cloud.database({ env: 'mininote-ledh1' });
const Cont = Db.collection("diary");
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    lists: app.appData.lists,
    ii:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    username:'AAAAA'
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var that = this;
   
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  //console.log('1')
                  // 获取到用户的 code 之后：res.code
                  //console.log("用户的code:" + res.code);
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
    // console.log(app.globalData)
    //that.setData({ username:app.globalData.userInfo.nickName })
    db.collection('noteBookInfo').doc(that.data.username).get({
      success: function (res) {
        // res.data 包含该记录的数据
        //console.log(that.data.username)
        app.appData.ii = res.data.ii,
          app.appData.lists = res.data.lists,
          that.setData({ lists: res.data.lists, ii: res.data.ii })
      },
      fail: function (res) {
        //console.log(that.data.username)
        db.collection('noteBookInfo').add({
          data: {
            _id: that.data.username,
            ii: app.appData.ii,
            lists: app.appData.lists
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id 
            this.setData({
              ii: app.appData.ii,
              lists: app.appData.lists
            })
            wx.showToast({
              title: '新增记录成功',
            })
          }
        })
        //console.log('notget')
      }
    });

  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      app.globalData.userInfo=e.detail.userInfo;
      //console.log('111')
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },



  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {

  },

  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {

  },

  /** 
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {

  },

  /** 
   * 生命周期函数--监听页面卸载 
   */
  onUnload: function () {

  },

  /** 
   * 页面相关事件处理函数--监听用户下拉动作 
   */
  onPullDownRefresh: function () {

  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {

  },

  /** 
   * 用户点击右上角分享 
   */
  onShareAppMessage: function () {

  },
  addList: function (e) {
    var that = this;
    that.setData({ lists: app.appData.lists });
    var list = this.data.lists;
    app.appData.ii  +=1;
    var id = app.appData.ii;
    var newData = { msg: '',tag:id };
    list.push(newData),
    that.setData({ lists: list }),
    app.appData.lists=list
    wx.cloud.init();
    db.collection('noteBookInfo').doc(that.data.username).update({
      data: {
        ii: app.appData.ii,
        lists: app.appData.lists
      },
      success: function (res) {}
    })
  },
  delList: function (e) {
    var that = this;
    that.setData({ lists: app.appData.lists });
    var newLists = [];
    var id = e.currentTarget.dataset.id;
    var list = that.data.lists;
    wx.showModal({
      title: 'Warning',
      content: '是否确认删除？',
      success: function (res) {
        if (res.confirm) {
          list.splice(id, 1);
          that.setData({ lists: list });
          app.appData.lists = list;
          console.log('用户点击确定')
          db.collection('noteBookInfo').doc(that.data.username).update({
            data: {
              ii: app.appData.ii,
              lists: app.appData.lists
            },
            success: function (res) { }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          //console.log(app.appData.lists)
        }
      }
    })

  },
  option_con: function (e) {
    var that = this;
    that.setData({ lists: app.appData.lists });
    var list = that.data.lists;
    list[e.currentTarget.dataset.id].msg = e.detail.value;
    that.setData({ lists: list })
    app.appData.lists = list;
    db.collection('noteBookInfo').doc(that.data.username).update({
      data: {
        ii: app.appData.ii,
        lists: app.appData.lists
      },
      success: function (res) { }
    })
  },
  test: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(app.appData.lists[id].tag)
    app.appData.nb_id = app.appData.lists[id].tag
//找最近修改者
    Db.collection('diary').where({
      nb_id: app.appData.nb_id
    })
      .get({
        success(res) {
          console.log("nb_id=" + app.appData.nb_id)
          console.log(res.data)
          // console.log(res.data[])
          // this.data.username = res.data[res.data.length-1].userName
          console.log(res.data[res.data.length - 1].userName)
          console.log(res.data.length)
          app.appData.latest_username = res.data[res.data.length - 1].userName
          //console.log(app.appData.latest_username)
          app.appData.latest_submit=res.data[res.data.length-1].time

        }
      }) 

    wx.navigateTo({
      url: '../diary/diary',
    })
  },
  test2: function () {
    console.log('用户选择分享')
  }
})