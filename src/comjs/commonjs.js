
exports.install = function (Vue, options) {
    //获取LocalStorage的信息
    Vue.prototype.getLocalStorage = function () {
        let usermsg
        if (localStorage.getItem("usermsg")) {
            usermsg = JSON.parse(localStorage.getItem("usermsg"))
            return usermsg;
        }else{
            return false
        }
        
    };
    //验证token是否有效
    Vue.prototype.istoken = function () {
        let that = this;
        if(!that.getLocalStorage()){
            that.$router.push({ name: "login", params: { id: "参数" } });
            return
        }
        let usermsg = that.getLocalStorage();
        let ajaxData = {
            token: usermsg.token
        }
        that.$axios({
            method:"GET",
            url:'cloud/category',
            params:ajaxData
        }).then(res => {
            console.log(res);
                if (res.data.result_msg == "token无效") {
                    that.$router.push({ name: "login", params: { id: "参数" } });
                }else{
                    // console.log(1);
                }
            })
    };
};