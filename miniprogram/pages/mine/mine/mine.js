var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    password:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  jumpPage: function () {
    app.appData.userinfo = { username: this.data.username, password: this.data.password };
    console.log(app.appData.userinfo);
    wx.switchTab({
      url: '../../user/user',
    })
    //console.log(app.appData.userinfo)
    // app.appData.userinfo = { username: this.data.username, password: this.data.password };
  },

  usernameinput: function (event) {
    this.setData({ username: event.detail.value })
  },
  passwordinput: function (event) {
    this.setData({ password: event.detail.value })
  }
})