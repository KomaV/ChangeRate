// 设置国家数组
var country = new Array();
//本地存储
var storage = window.localStorage;

//当前输入金额的input对应的ID
var moneyId = "";
//当前输入金额的input对应的值
var moneyNum="";

function init(){
	//默认汇率
	//美元兑换人民币
	country[0] = 630.01;
	//日元兑换人民币
	country[1] = 8.09;
	//里尔兑换人民币
	country[2] = 311.59;
	//新加坡元兑换人民币
	country[3] = 510.59;
	//欧元兑换人民币
	country[4] = 800.01;
	//克朗兑换人民币
	country[5] = 91.59;
	//英镑兑换人民币
	country[6] = 1009.59;
	//返回按钮时间
	$("#backBtn").bind("click",function(){changeRate();});
	//给设置汇率页面的input框设置值
	for(var i=0; i<country.length; i++){
		//步骤：
		//1-线判断本地存储中是否有对应的国家的汇率
		//2-如果有，则将汇率直接赋值给country数组（汇率表）
		//3-如果没有，则将默认汇率写入到本地存储中
		//4-直接读取country给所有的input赋值
		var r = i+2;
		if(storage.getItem("r"+r) ==  null){//本地存储没有数据
			storage.setItem("r"+r,country[i]);
		}else{
			country[i] = storage.getItem("r"+r);
		}
	}
	//将汇率写入到input
	showER();
	//为首页input添加事件
	for(var i=0;i<=country.length;i++){
		var c = i+1;
		$("#c"+c).bind("keyup change",function(){this.value=numberAndPoint(this.value);exchangeRates(this);});//根据当前对象的值，改变汇率
	}
	
	for(var i=0;i<country.length;i++){
		var r = i+2;
		$("#r"+r).bind("keyup change",function(){this.value=numberAndPoint(this.value);});
	}
}

-//兑换汇率
function exchangeRates(obj){
	moneyId = obj.id;//c2
	moneyNum = obj.value;//2美金
	var moneyCNid = moneyId;//
	var moneyCNNum = "";//当前币种兑换人民币的金额
	
	moneyCNid = moneyCNid.substring(1,moneyId.length)-2;
	moneyCNNum = moneyNum * (country[moneyCNid] / 100);
	
	var temp = 0;
	
	$("#exchangeRates").find("input").each(function(index, element) {
        if(this.id  != moneyId){
			//改变汇率
			if(moneyId == "c1"){//这里改变的是人民币
				if(this.id != "c1"){//除了人民币之外的所有空格都需要更换对应的汇率值
					var thisNum = moneyNum * (100/country[temp]);
					$(this).val(formateNum(thisNum,2));
					temp++;
				}
			}else{//当前改变的是非人民币的状态
				if(this.id != "c1"){//美金兑换日元
					var thisNum = moneyCNNum * (100/country[temp]);
					$(this).val(formateNum(thisNum,2));
					temp++;
				}else{//美金兑人民币
					$(this).val(formateNum(moneyCNNum,2));
				}
			}
		}else{
			//当前就是正在被改变的币种
			if(moneyId != "c1"){
				temp++;
			}
		}
		
    });
}

//设定只能输入数字和小数点
function numberAndPoint(str){
	return str.replace(/[^(\d|\.)]/g,"");
}

//格式化数字。参数1：需要被格式化的数字；参数2：位数
function formateNum(str,num){
	var s = parseFloat(str);
	if(!num) num = 4;
	if(isNaN(s)){//isNaN:非法数字
		return;
	}
	s = s.toFixed(num);//四舍五入
	if(s == "" || s<0) s=0;
	return s;
}

//设置汇率（将input中的值循环放入本地存储）
function changeRate(){
	for(var i=0; i<country.length; i++){
		var r = i+2;
		storage.setItem("r"+r,$("#r"+r).val());//将设置好的汇率写入本地存储
		country[i] = $("#r"+r).val();//设置好的汇率写入数组
	}
}

//将汇率写入到input
function showER(){
	for(var i=0; i<country.length; i++){
		var r = i+2;
		$("#r"+r).val(country[i]);//写入值
	}
}