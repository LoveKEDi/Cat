const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catDetail: {},
  },
  goComment:function(event) {
    wx.navigateTo({
      url: `../comment/comment?catname=${event.target.dataset.catname}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('CatWorld').where({
      name:options.catname
    }).get().then(res =>{
      this.setData({
        catDetail : res.data[0]
      })
    }).catch(err => {
      console.error(err);
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

  }
})