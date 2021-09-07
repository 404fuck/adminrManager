import {
	ajax,
	ajaxFile
} from '@/http/api'


var request = function () {
	var self = {};

	//获取餐饮类型信息字典
	self.pwdlogin = function (data, successfn) {
		ajax('/pf/pwdlogin', data, false, 'post', successfn);
	};

	//查询商户列表
	self.listcompany = function (data, successfn) {
		ajax('/apis/platform/post/listcompany', data, false, 'post', successfn);
	};
	//设置门店的首页url 添加企业支付名称
	self.mainPageUrl = function (data, successfn) {
		ajax('/apis/platform/post/mainPageUrl', data, false, 'post', successfn);
	};

	//获取餐饮类型信息字典
	self.getcateringtype = function (data, successfn) {
		ajax('/apis/platform/post/getcateringtype', data, false, 'post', successfn);
	};

	//获取地理位置信息字典
	self.getareainfo = function (data, successfn) {
		ajax('/apis/platform/post/getareainfo', data, false, 'post', successfn);
	};

	//查询商户推送列表
	self.companymsglist = function (data, successfn) {
		ajax('/apis/platform/post/companymsglist', data, false, 'post', successfn);
	};
	//添加推送
	self.pushcompany = function (data, successfn) {
		ajax('/apis/platform/post/pushcompany', data, false, 'post', successfn);
	};

	//查询资质
	self.findqual = function (data, successfn) {
		ajax('/apis/platform/post/findqual', data, false, 'post', successfn);
	};

	//解冻,冻结门店
	self.lockdept = function (data, successfn) {
		ajax('/apis/platform/post/lockdept', data, false, 'post', successfn);
	};
	//删除
	self.removedept = function (data, successfn) {
		ajax('/apis/platform/post/removedept', data, false, 'post', successfn);
	};

	//用户列表
	self.listuser = function (data, successfn) {
		ajax('/apis/platform/post/listuser', data, false, 'post', successfn);
	};
	//冻结用户
	self.lockuser = function (data, successfn) {
		ajax('/apis/platform/post/lockuser', data, false, 'post', successfn);
	};
	//删除用户
	self.removeuser = function (data, successfn) {
		ajax('/apis/platform/post/removeuser', data, false, 'post', successfn);
	};

	//用户消息
	self.usermsglist = function (data, successfn) {
		ajax('/apis/platform/post/usermsglist', data, false, 'post', successfn);
	};
	//新增用户推送
	self.pushuser = function (data, successfn) {
		ajax('/apis/platform/post/pushuser', data, false, 'post', successfn);
	};

	//城市列表
	self.citylist = function (data, successfn) {
		ajax('/apis/platform/post/citylist', data, false, 'post', successfn);
	};

	//钱包列表
	self.walletlist = function (data, successfn) {
		ajax('/pwallet/walletlist', data, false, 'post', successfn);
	};
	//冻结钱包
	self.walletfrozen = function (data, successfn) {
		ajax('/pwallet/walletfrozen', data, false, 'post', successfn);
	};
	//解冻钱包
	self.walletunfrozen = function (data, successfn) {
		ajax('/pwallet/walletunfrozen', data, false, 'post', successfn);
	};
	//钱包充值记录
	self.wallethis = function (data, successfn) {
		ajax('/pwallet/wallethis', data, false, 'post', successfn);
	};
	//钱包充值
	self.walletrecharg = function (data, successfn) {
		ajax('/pwallet/walletrecharg', data, false, 'post', successfn);
	};

	//大平台线下结算翻页
	self.walletsettlepage = function (data, successfn) {
		ajax('/pwallet/walletsettlepage', data, false, 'post', successfn);
	};
	//提交转账记录
	self.transfer = function (data, successfn) {
		ajax('/pf/pay/transfer', data, false, 'post', successfn);
	};
	//提现总额
	self.walletsettletotal = function (data, successfn) {
		ajax('/pwallet/walletsettletotal', data, false, 'post', successfn);
	};
	//填写结算信息
	self.walletdealsettle = function (data, successfn) {
		ajax('/pwallet/walletdealsettle', data, false, 'post', successfn);
	};
	//已结算总额
	self.walletsettlerealtotal = function (data, successfn) {
		ajax('/pwallet/walletsettlerealtotal', data, false, 'post', successfn);
	};
	//已结算详情
	self.walletsettledetail = function (data, successfn) {
		ajax('/pwallet/walletsettledetail', data, false, 'post', successfn);
	};





	//大平台用户列表不带翻页
	self.alluser = function (data, successfn) {
		ajax('/pf/user/alluser', data, false, 'post', successfn);
	};

	//钱包设置
	self.walletlimit = function (data, successfn) {
		ajax('/pwallet/walletlimit', data, false, 'post', successfn);
	};
	//获取钱包设置
	self.getwalletlimit = function (data, successfn) {
		ajax('/pwallet/getwalletlimit', data, false, 'post', successfn);
	};

	//使用反馈列表
	self.feedbackpage = function (data, successfn) {
		ajax('/pf/fb/feedbackpage', data, false, 'post', successfn);
	};
	//更新忽略原因
	self.saveignore = function (data, successfn) {
		ajax('/pf/fb/saveignore', data, false, 'post', successfn);
	};
	//更新反馈
	self.savereply = function (data, successfn) {
		ajax('/pf/fb/savereply', data, false, 'post', successfn);
	};

	//合作申请列表
	self.appjoinpage = function (data, successfn) {
		ajax('/pf/aj/appjoinpage', data, false, 'post', successfn);
	};
	//更新已联系备注
	self.ajsavecontact = function (data, successfn) {
		ajax('/pf/aj/savecontact', data, false, 'post', successfn);
	};
	//更新忽略原因
	self.ajsaveignore = function (data, successfn) {
		ajax('/pf/aj/saveignore', data, false, 'post', successfn);
	};

	//文档列表
	self.findlist = function (data, successfn) {
		ajax('/api/platform/doc/post/findlist', data, false, 'post', successfn);
	};

	//文档添加
	self.docAdd = function (data, successfn) {
		ajax('/api/platform/doc/post/add', data, false, 'post', successfn);
	};

	//文档修改
	self.docUpdate = function (data, successfn) {
		ajax('/api/platform/doc/post/update', data, false, 'post', successfn);
	};

	//文档删除
	self.docDel = function (data, successfn) {
		ajax('/api/platform/doc/post/del', data, false, 'post', successfn);
	};

	//查询产品名称(功能)列表
	self.productlist = function (data, successfn) {
		ajax('/api/platform/doc/post/productlist', data, false, 'post', successfn);
	};

	//添加产品功能
	self.profunctionadd = function (data, successfn) {
		ajax('/api/platform/doc/post/profunctionadd', data, false, 'post', successfn);
	};

	//删除产品功能
	self.profunctiondel = function (data, successfn) {
		ajax('/api/platform/doc/post/profunctiondel', data, false, 'post', successfn);
	};

	//查询产品
	self.findDoc = function (data, successfn) {
		ajax('/api/platform/doc/post/find', data, false, 'post', successfn);
	};

	//添加问题
	self.addquestion = function (data, successfn) {
		ajax('/api/platform/doc/post/addquestion', data, false, 'post', successfn);
	};

	//修改问题
	self.updatequestion = function (data, successfn) {
		ajax('/api/platform/doc/post/updatequestion', data, false, 'post', successfn);
	};


	//商户结算
	self.offlineSettlePages = function (data, successfn) {
		ajax('/pf/pay/offlineSettlePages', data, false, 'post', successfn);
	};
	//结算金额
	self.totalAmount = function (data, successfn) {
		ajax('/pf/pay/totalAmount', data, false, 'post', successfn);
	};
	/*
	  ---在线门店管理---
	*/
	// 点评门店审核列表查询
	self.onlineList = function (data, successfn) {
		ajax('/api/platform/online/post/onlinelist', data, false, 'post', successfn);
	};
	//点评门店审核状态数量查询
	self.statuScount = function (data, successfn) {
		ajax('/api/platform/online/post/statuscount', data, false, 'post', successfn);
	};
	//点评门店审核信息查询
	self.lookInfo = function (data, successfn) {
		ajax('/api/platform/online/post/info', data, false, 'post', successfn);
	};
	//上下线 
	self.onLinests = function (data, successfn) {
		ajax('/api/platform/online/post/onlinests', data, false, 'post', successfn);
	};
	//获取原因 option   
	self.reasonList = function (data, successfn) {
		ajax('/api/platform/online/post/reasonlist', data, false, 'post', successfn);
	};
	//删除   
	self.del = function (data, successfn) {
		ajax('/api/platform/online/post/del', data, false, 'post', successfn);
	};
	//审核是否通过 
	self.checkPass = function (data, successfn) {
		ajax('/api/platform/online/post/checkpass', data, false, 'post', successfn);
	};
	
	/*
	  ---系统更新管理---
	*/
	
	//更新信息列表翻页
	self.upgradePage = function (data, successfn) {
		ajax('/api/pf/upgrade/upgradePage', data, false, 'post', successfn);
	};
    //信息详情
	self.upgradeDetail = function (data, successfn) {
		ajax('/api/pf/upgrade/upgradeDetail', data, false, 'post', successfn);
	};
	//新建更新信息
	self.saveUpgrade = function (data, successfn) {
		ajax('/api/pf/upgrade/saveUpgrade', data, false, 'post', successfn);
	};
	//编辑更新信息
	self.updateUpgrade = function (data, successfn) {
		ajax('/api/pf/upgrade/updateUpgrade', data, false, 'post', successfn);
	};
	//上传apk
	self.updateAPK = function (data, successfn) {
		ajax('/api/pf/upgrade/updateAPK', data, false, 'post', successfn);
	};
	//所有企业的翻页列表
	self.allCompany = function (data, successfn) {
		ajax('/apis/platform/get/allCompany', data, false, 'post', successfn);
	};
	//所有门店的翻页列表
	self.allDep = function (data, successfn) {
		ajax('/apis/platform/get/allDep', data, false, 'post', successfn);
	};


	return self;
}();

export {
	request
}