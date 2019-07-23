const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    msgitem:{},
    username:'',
    userimg:'',
    content:'',
    date:'',
    msg:[]
  },
  onContentChange: function (event) {
    this.setData({
      content: event.detail
    })
  },
  getMsg:function(){
    var _this = this;
    var d=this.getNowFormatDate();
    wx.showLoading({
      title: '留言ing...',
    })
    wx.getUserInfo({
      success: function (res) {
        _this.setData({
          username: res.userInfo.nickName,
          userimg: res.userInfo.avatarUrl
        })
      }
    })
    this.setData({
      msgitem: {
        username: this.data.username,
        userimg: this.data.userimg,
        content: this.data.content,
        date:d
      }
    })
  },
  addMsg:function() {
    var _this = this;
    var d = this.getNowFormatDate();
    if(this.data.content==''){
      wx.showToast({
        title: '请输入文字！',
        icon: 'loading',
        duration: 1000
      })
    }
    else{
      this.getMsg();
      if (this.data.msgitem.username != '') {
        this.setData({
          msg: _this.data.msg.concat(this.data.msgitem)
        })
        console.log(this.data.date)
        db.collection('commentList').add({
          data: {
            catname: this.data.name,
            content: this.data.content,
            username: this.data.username,
            userimg: this.data.userimg,
            date: d
          }
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '留言成功！',
          })
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '留言失败！',
          })
        })
      }
    }
   
  },
  getNowFormatDate:function() {
    let date = new Date();
    const seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if(month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('commentList').where({
      catname: options.catname
    }).get().then(res => {
      this.setData({
        msg: res.data,
      })
    }).catch(err => {
      console.error(err);
    })
    this.setData({
      name: options.catname
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