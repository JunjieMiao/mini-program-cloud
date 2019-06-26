// miniprogram/pages/menu/menu.js 
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    lists: [],
    ii:0
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
    var lists = that.data.lists;
    this.data.ii=this.data.ii+1;
    var id = this.data.ii;
    var newData = { msg: '',tag:id };
    lists.push(newData);
    this.setData({ lists: lists, })
  },
  delList: function (e) {
    var that = this;
    var newLists = [];
    var id = e.currentTarget.dataset.id;
    var lists = this.data.lists;
    wx.showModal({
      title: 'Warning',
      content: '是否确认删除？',
      success: function (res) {
        if (res.confirm) {
          lists.splice(id, 1);
          that.setData({ lists: lists, })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
          console.log(lists)
        }
      }
    })

  },
  option_con: function (e) {
    var that = this;
    var lists = that.data.lists;
    lists[e.currentTarget.dataset.id].msg = e.detail.value;
    that.setData({ lists: lists })
  },
  test: function () {
    wx.navigateTo({
      url: '../diary/diary',
    })
  },
  test2: function () {
    console.log('用户选择分享')
  }
})