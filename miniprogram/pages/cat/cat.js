// miniprogram/pages/cat/cat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList:[]
  },
  goDetail:function(event){
    wx.navigateTo({
      url: `../detail/detail?catname=${event.target.dataset.catname}`,
    })
  },
  getCatList:function (){
    wx.showLoading({
      title: '正在加载中',
    });
    wx.cloud.callFunction({
      name: 'catList',
    }).then(res => {
      this.setData({
        catList: this.data.catList.concat(res.result.data)
      })
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatList();
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

  }
})