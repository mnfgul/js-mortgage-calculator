$(document).ready(function(){
	
	try{
		$("ul.dropdown li").hover(function(){
	        $(this).addClass("hover");
			if($(this).children(".dir").length>0)
			{
				$("> .dir", this).addClass("open");
			}
	        
	        $("ul:first", this).css('visibility', 'visible');
	    }, function(){
	        $(this).removeClass("hover");
			if ($(this).children(".dir").length > 0) {
				$(".open", this).removeClass("open");
			}
	        $("ul:first", this).css('visibility', 'hidden');
	    });
	}catch(err){
		
	}
	
	$(".infoIcon").easyTooltip();
	
	
	$("li.noDir").hover(function(){
		$(this).css('color','#fff !important');
	});
	
	$("input.number").bind('keypress', function(e) { 
		return ( e.which!=8 && e.which!=0 && (e.which<40 || e.which>57 || e.which==188 || e.which==189)) ? false : true ;
	})
	
	try{
		if(isPrequalify)
		{
			preQualifyOpts();
		}
	}catch(er){
		
	}	
		
});

function formatCurrency(num){
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) 
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) 
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) 
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '' + num + '.' + cents);
}
function calc2Reset()
{
	//reset calc 2 values
	$("#grossIncome1").val('');
	$("#fBonusAvrg").val('');
	$("#hourlyWage").val('');
	$("#totalGross").text('0.0');
}

function calc2Opt(){
	//assign variables
	var payPeriod=$("#payPeriod").val();
	var hourOrSalary=$("#hourOrSalary").val();

	//if selected Hour
	if(hourOrSalary=="1"){
		var hourlyWage=parseInt($("#hourlyWage").val());
		if(isNaN(hourlyWage)) hourlyWage=0;
		
		var work40Hours=$("#work40Hours").val(); //1=yes, 2=no
		
		var overtime1=parseInt($("#overtime1").val());
		if(isNaN(overtime1)) overtime1=0;
		
		//var totalGross2=$("#totalGross2").val();
		var normalHours=parseInt($("#normalHours").val());
		if(isNaN(normalHours)) normalHours=0;
		
		var overtime2=parseInt($("#overtime2").val());
		if(isNaN(overtime2)) overtime2=0;
	}
	
	//if selected Salary
	if(hourOrSalary=='2'){
		var grossIncome1=parseInt($("#grossIncome1").val());
		if(isNaN(grossIncome1)) grossIncome1=0;
		
		var pBonus=$("#pBonus").val(); //1=yes, 2=no
		var fBonus=$("#fBonus").val(); //1=yes, 2=no
		
		var fBonusAvrg=parseInt($("#fBonusAvrg").val());
		if(isNaN(fBonusAvrg)) fBonusAvrg=0;
		
		var totalGross1=$("#totalGross1").val();
	}
	
	var totalGrosIncome=0;
	//if hourly
	if(hourOrSalary=="1") 
	{
		var hourlyGross=0;
		var overtime1Total=0;
		if(work40Hours=="1"){					//if works 40 hours
			hourlyGross=parseInt(hourlyWage)*40;
			overtime1Total=overtime1*52/12;
			hourlyGross+=overtime1Total;
		}
		else{
			hourlyGross=parseInt(hourlyWage)*parseInt(normalHours);
			overtime1Total=overtime2*52/12;
			hourlyGross+=overtime1Total;
		}
		hourlyGross=hourlyGross*4;

		//calculate total monthly gross income
		totalGrosIncome=hourlyGross.toFixed(2);
		$("#totalGross").text(totalGrosIncome);
	}
	
	if(hourOrSalary=="2")
	{
		var salaryGross=0;
		salaryGross=parseInt(grossIncome1)+parseInt(fBonusAvrg);
		
		//calculate total monthly gross income
		totalGrosIncome=salaryGross.toFixed(2);
		$("#totalGross").text( totalGrosIncome);
	}
}

function step2Opt(){
	var opt=$("#lpurpose").val();
	$(".opt2").fadeOut();
	if(opt=="1")
	{
		$(".purFields").fadeIn();
	}
}
function step2CbOpt(opt){
	if(opt==0)
	{
		$("div#cbOpt").slideUp();
		$("#cfname").removeClass("required");
		$("#clname").removeClass("required");
		$("#chphone3").removeClass("required");
	}
	else{
		$("div#cbOpt").slideDown();
		$("#cfname").addClass("required");
		$("#clname").addClass("required");
		$("#chphone3").addClass("required");
	}
}
function step3Opt1(opt){
	if(opt==0)
	{
		$(".opt1").fadeOut();
	}
	else{
		$(".opt1").fadeIn();
	}
}
function step3Opt2(opt){
	if(opt==0)
	{
		$(".opt2").fadeOut();
	}
	else{
		$(".opt2").fadeIn();
	}
}
function step4Opt1(){
	var years=parseInt($("#emp1_years").val());
	if(years<2){
		$(".opt111").show();
	}else{
		$(".opt111").hide();
	}
}

function step5Total(){
	var total=0;
	var base=$("#base").val();
	var period=$("#period").val();
	var multp=1;
	switch(period){
		case '1':{
			multp=1;
		}break;
		case '2':{
			multp=12;
		}break;
		case '3':{
			multp=24;
		}break;
		case '4':{
			multp=48;
		}break;
		default:{
			multp=1;
		}
	}
	
	baseTotal=parseFloat(base)* multp;
	if(isNaN(baseTotal)){
		baseTotal=0;
	}
		
	$(".total").each(function(){
		var tempVal=$(this).val();
		if(!(isNaN(tempVal)||(tempVal==0)))
		{
			total+=parseFloat(tempVal); 	
		}
	});
	$("#totalGross").text(total+baseTotal);
}
function step5Other(){
	var total=0;
		
	$(".other").each(function(){
		var tempVal=$(this).val();
		if(!(isNaN(tempVal)||(tempVal==0)))
		{
			total+=parseInt(tempVal); 	
		}
	});
	$("#otherTotal").text(total);
}
function step5IncList(nm){
	var item=$(nm).val();
	var name=$(nm).attr('name');
	if(item==21){
		//$(".hide").hide();
		if(name=="o1dec"){
			$(".o1documented").show();
		}
		if(name=="o2dec"){
			$(".o2documented").show();
		}
		if(name=="o3dec"){
			$(".o3documented").show();
		}
	}else
	{
		if(name=="o1dec"){
			$(".o1documented").hide();
		}
		if(name=="o2dec"){
			$(".o2documented").hide();
		}
		if(name=="o3dec"){
			$(".o3documented").hide();
		}
	}
}

function step6Total(){
	var total=0;
	$(".total").each(function(){
		var tempVal=$(this).val();
		if(!(isNaN(tempVal)||(tempVal==0)))
		{
			total+=parseInt(tempVal); 	
		}
	});
	$("#totalDebt").text(total);
}

function step7Props(){ 
	$(".checkbox").each(function(){
		if($(this).is(":checked"))
		{
			$(this).parent().parent().parent().parent().find(".fck").show();
		}
		else
		{
			$(this).parent().parent().parent().parent().find(".fck").hide();	
		}
	});
}
function step8Opts(){ 
	if($("input#q14").is(":checked"))
	{
		$(".opt1").show();
	}
	else{
		$(".opt1").hide();
	}
	
	if($("input#furnish").is(":checked"))
	{
		$("#opt2").hide();
	}
	else{
		$("#opt2").show();
	}
}
function step8Race(){
	if($("input#eth1").is(":checked")){
		$("input#race4").attr("checked", true);
	}else{
		$("input#race4").attr("checked",false);
	}
}

function qcbOption(opt){
	if(opt==0)
	{
		$("table#cb").hide();
		$("#cb_fname").removeClass("required");
		$("#cb_lname").removeClass("required");
	}
	else{
		$("table#cb").show();
		$("#cb_fname").addClass("required");
		$("#cb_lname").addClass("required");
	}
}
function preQualifyOpts()
{
	$("#hourOrSalary").change(function(){
		$(".salaryOpt, .hourOpt").hide();
		if($(this).val()=="2"){
			$(".salaryOpt").fadeIn();
			$(".pBonusOpt").hide();
		}
		else
		{
			$(".hourOpt").fadeIn();
			$(".hourOpt40No").hide();
			$(".hourOpt40Yes").hide();
		}
	});
	
	$("#work40Hours").change(function(){
		$(".hourOpt40Yes, .hourOpt40No").hide();
		if($(this).val()=="2"){
			calc2Opt();
			$(".hourOpt40No").fadeIn();
			$(".hourOpt40Yes").hide();
		}
		else{
			calc2Opt();
			$(".hourOpt40Yes").fadeIn();
			$(".hourOpt40No").hide();
		} 
	});
	
	$("#pBonus").change(function(){
		$(".pBonusOpt").hide();
		if($(this).val()=="2") $(".pBonusOpt").fadeIn();
		if($(this).val()=="1") $(".pBonusOpt").hide();
	});
	
	//mortgage section
	$("#mortgage").blur(function(){
		if($(this).val()!=""){
			$(".mortgageOpt1").show();
		}else{
			$(".mortgageOpt1").fadeOut();
		}
	});
	$("#isSold").change(function(){
		if($(this).val()=="2"){
			$(".mortgageOpt2").show();
		}else{
			$(".mortgageOpt2, .mortgageOpt3").fadeOut();
		}
	});
	$("#isRental").change(function(){
		if($(this).val()=="1")
		{
			$(".mortgageOpt3").show();
		}
		else{
			$(".mortgageOpt3").fadeOut();
		}
	});
	
	$("#grossIncome1 , #fBonusAvrg, #hourlyWage, #overtime1, #overtime2, #normalHours").change(function(){
		calc2Opt();
	});
}

function quickCheck()
{
	$("span.error").remove();
	var result1 =checkRequireds();
	var result2=checkEmails();
	if(result1&&result2)
	{
		return true;
	}
	else
	{
		document.location="#";
		return false;
	}
}

function checkRequireds()
{
	requireds=$("input.required");
	var result=true;
	$.each(requireds, function(){
		if($(this).val()=="")	
		{
			$(this).addClass("inputError").after('<span class="error">Please fill this area!</span>');
			$(".inputError").blur(function(){
				$(this).removeClass("inputError").parent().children(".error").remove();
			});
			result=false;
		}
	});
	return result;
}
function checkEmails()
{
	emails=$("input.email");
	var result=true;
	$.each(emails, function(){
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!filter.test($(this).val()))
		{
			$(this).addClass("inputError").after('<span class="error">Please enter correct email!</span>');
			$(".inputError").blur(function(){
				$(this).removeClass("inputError").parent().children(".error").remove();
			});
			result=false;
		}
	});
	return result;
}

function changeRate(){
	if($("#term").val() <='15'){
		$("#rate30").hide();
		$("#rate15").show();
	}
	if($("#term").val() > '15'){
		$("#rate15").hide();
		$("#rate30").show();
	}
}

/*Calculators*/
function calc1(){
		
	try {
		//consts
		var appRateRent = "3";
		var apprateOwn = "5";
		var intRateOwn = "5.50";
		
		//variables
		var crent = $("input#crent").val(); //Current Rent Payment
		var pprice = $("input#pprice").val(); //Purchase price
		var dpayment = $("#dpayment").val() //Down Payment
		var term = $("#term").val(); //Term
		var paymentNumbers=term*12;
		var rate=0;
		
		if(term <='15'){
			rate=parseFloat($("#rate15").val());
		}
		if(term > '15'){
			rate=parseFloat($("#rate30").val());
		}

		//var rate = $("#rate").text(); //Rate
		var stay = $("#stay").val();
		
		//const vars
		var lammount = pprice - dpayment;
		var lammount2 = pprice - lammount;
		
		//start calc
		var cCost = 2728.45 + (pprice * (1 / 100));
		var savedRent = parseInt(crent);
		var saveRent1 = 0;
		
		//Rent Saved
		var totalSavedRent=900;
		for(r=1; r<stay; r++)
		{
			totalSavedRent+=totalSavedRent*(3/100);
		}
		totalSavedRent=totalSavedRent*stay;
		
		var equity = parseFloat(pprice);
		var lossofInterest=lammount2;
		
		for (i = 1; i < stay; i++) {
			saveRent1 = savedRent;
			equity = equity * 1.05;
			lossofInterest +=(lossofInterest * (3 / 100));
			savedRent = saveRent1 + saveRent1 * 3 / 100;
		}
		equity=equity-pprice;
		
		//income tax benefit
		var b1 = ((pprice * 2.6) / 100) * stay;
		
		//amortization table 3
		var bBalance = lammount; //column1
		var totalPayment=0;//=PMT(rate/100/12,term*12,lammount,5); //colimn3
		var schPayment=0;//=totalPayment; //column2
		var interest=0;//=((lammount/100)*(rate/12)); //column5
		var principal=0;//=totalPayment-interest; //column4		
		var totalInterest = 0;
		var table = new Array();
		var count = 0;
		for (j = 1; j <= 360; j++) {
			//totalPayment = PMT(rate / 100 / 12, term * 12, lammount, 5); //colimn3
			totalPayment = calculate_payment(lammount, rate / 100 / 12, term * 12); //colimn3
			schPayment = totalPayment; //column2
			interest = ((bBalance / 100) * (rate / 12)); //column5 
			principal = totalPayment - interest; //column4   
			ending = bBalance - principal;
			
			totalInterest += interest;

			if(j<12){
				if (j == 10) {
					table[count] = totalInterest;
					count++;
				}
			}
			else{
				if ((j % 12) == 1) {
					table[count] = totalInterest;
					count++;
				}
			}
				
			bBalance = ending;
		}
		b2 = table[stay-1];
		
		var incomeTaxBenefit = (b1 + b2) * (20 / 100);
		var totalMortgage=calculate_payment(lammount, rate / 100 / 12, term * 12);
		totalMortgage=totalMortgage*stay*12;
		//var totalMortgage = totalPayment * stay * 12;
		
		var totalRent = cCost + lossofInterest + totalMortgage;
		var totalOwn = equity + incomeTaxBenefit + (savedRent * stay);
		
		var totalBenefit = totalOwn - totalRent;
		
		//inject results
		$("#rentSaved").text( formatCurrency(totalSavedRent.toFixed(2)));
		$("#cCostRent").text( formatCurrency(cCost.toFixed(2)));
		$("#equityOwn").text(formatCurrency(equity.toFixed(2)));
		$("#lossofInterestRent").text(formatCurrency(lossofInterest.toFixed(2)));
		$("#tMortgageRent").text(formatCurrency(totalMortgage.toFixed(2)));
		$("#incTaxBenefitOwn").text(formatCurrency(incomeTaxBenefit.toFixed(2)));
		$("#totalRent").text(formatCurrency(totalRent.toFixed(2)));
		$("#totalOwn").text(formatCurrency(totalOwn.toFixed(2)));
		$("#totalBenefit").text(formatCurrency(totalBenefit.toFixed(2)));
	}
	catch(err)
	{
		alert("Please enter information in correct format and try again!");
	}
	 
	//debuging
	//console.log("loan ammount",lammount);
	//console.log("------------------Calc Start---------------");
	//console.log("ccost",cCost);
	//console.log("equity",equity); 
	//console.log("loss of interest",lossofInterest);
	//console.log("Bigining balance",bBalance);
	//console.log("total payment",totalPayment);
	//console.log("prinsical",principal);
	//console.log("interest",interest);
	//console.log("saved Rent",savedRent);
	
	//console.log("--------------Table -----------------------");
	//console.log("1",table[0]);
	//console.log("2",table[1]);
	//console.log("3",table[2]);
	
	$("#calc1Progress").fadeOut("slow");
	$("#calc1Result").fadeIn();
	return false;
}

function calc2(){
	//PreQualify
	//$("#calc2Progress").show();	
		
	var totalGrosIncome=0;
	totalGrosIncome=parseInt($("#totalGross").text());
	if(isNaN(totalGrosIncome)) totalGrossIncome=0;
	
	//Monthly payment conts
	var mortgage=parseInt($("#mortgage").val());
	if(isNaN(mortgage)){ mortgage=0;}
	
	var isSold=$("#isSold").val(); //1=yes, 2=no
	var isRental=$("#isRental").val(); //1=yes, 2=no
	
	var rentalRent=parseInt($("#rentalRent").val());
	if(isNaN(rentalRent)){rentalRent=0;}
	
	var carLoan1=parseInt($("#carLoan1").val());
	if(isNaN(carLoan1)){ carLoan1=0; } 
	
	var carLoan2=parseInt($("#carLoan2").val());
	if(isNaN(carLoan2)){ carLoan2=0; } 
	
	var carLoan3=parseInt($("#carLoan3").val());
	if(isNaN(carLoan3)){ carLoan3=0; }
	
	var installLoan1=parseInt($("#installLoan1").val()); 
	if(isNaN(installLoan1)){installLoan1=0;}
	
	var installLoan2=parseInt($("#installLoan2").val()); 
	if(isNaN(installLoan2)){installLoan2=0;}
	
	var installLoan3=parseInt($("#installLoan3").val());
	if(isNaN(installLoan3)){installLoan3=0;}
	
	var cCards=parseInt($("#cCards").val());
	if(isNaN(cCards)){ cCards=0;}
	
	var other=parseInt($("#other").val());
	if(isNaN(other)){other=0;}
	
	var moneyAvaliable=parseInt($("#moneyAvaliable").val()); //list
	if(isNaN(moneyAvaliable)){moneyAvaliable=0;}
	
	var term=$("#term").val(); //term
	var rate=0;
			
	if(term <='15'){
		rate=parseFloat($("#rate15").val());
	}
	if(term > '15'){
		rate=parseFloat($("#rate30").val());
	}
		
	//var rate=parseFloat($("#rate").text());
	if(isNaN(rate)){rate=0;}
	
	//start calc of total obligations
	var totalObligations=0;
	var carLoans=carLoan1+carLoan2+carLoan3;
	var installs=installLoan1+installLoan2+installLoan3;
	totalObligations=mortgage+carLoans+installs+cCards+other+(rentalRent*75/100);

	
	//results
	var maxLeft=(totalGrosIncome*0.41)-totalObligations;
	var dPayment1Param=PV(maxLeft,rate/12,term*12);				//B31
	var dPayment1= (moneyAvaliable/dPayment1Param*100).toFixed(2);//B36
	
	var maxDebt1=0;												//D24
	if((dPayment1>0)&&(dPayment1<=5)) maxDebt1=0.61;
	if((dPayment1>5)&&(dPayment1<=10)) maxDebt1=0.63;
	if((dPayment1>10)&&(dPayment1<=15)) maxDebt1=0.65;
	if((dPayment1>15)&&(dPayment1<=100)) maxDebt1=0.68;
	
	var PandI=0;												//E20
	PandI=(maxLeft*maxDebt1).toFixed(0);
	
	var b33=0;													//B33
	b33=PV(PandI,rate/12,term*12)+moneyAvaliable;
	
	
	var year30MI1=0;												//E5
	if(term>=20)
	{
		if((dPayment1>=5)&&(dPayment1<10)) year30MI1=0.94;
		if((dPayment1>=10)&&(dPayment1<15)) year30MI1=0.62;
		if((dPayment1>=15)&&(dPayment1<20)) year30MI1=0.38;
		if(dPayment1>20) year30MI1=0;
	}else{
		year30MI1=0;
	}
	year30MI1=year30MI1/100;
	
	var year15MI1=0;												//E30
	if(term<=15){
		if(dPayment1<3.5){ year15MI1=0;}
		if((dPayment1>=3.5)&&(dPayment1<5)){ year15MI1=0.55;}
		if((dPayment1>=5)&&(dPayment1<10)){ year15MI1=0.84;}
		if((dPayment1>=10)&&(dPayment1<15)){ year15MI1=0.44;}
		if((dPayment1>=15)&&(dPayment1<20)){ year15MI1=0.34;}
		if(dPayment1>20){ year15MI1=0;}
	}else{
		year15MI1=-999;									//Why this weird number?
	}
	year15MI1=year15MI1/100;
	
	var MI1=1;													//E24
	if(year15MI1<0){
			MI1=year30MI1;
		}else{
			MI1=year15MI1;
		}
	
	var MITotal1=1;												//F24
	MITotal1=(MI1*(b33/12)).toFixed(2);
	
	var totalPIMI1=1;											//F26
	totalPIMI1=parseInt(PandI) + parseInt(MITotal1);
	
	var homeQualify=1;											//B32
	homeQualify=(PV(totalPIMI1,rate/12,term*12)+moneyAvaliable).toFixed(2);
	
	var dPayment2=(moneyAvaliable/homeQualify*100).toFixed(2);	//C36
	var maxDebt2=0;												//D36
	if((dPayment2>=0)&&(dPayment2<=5)){maxDebt2=0.61;}
	if((dPayment2>=5)&&(dPayment2<=10)){maxDebt2=0.63;}
	if((dPayment2>=10)&&(dPayment2<=15)){maxDebt2=0.65;}
	if((dPayment2>=15)&&(dPayment2<=100)){maxDebt2=0.68;}
	maxDebt2=(maxDebt2).toFixed(5);
	
	var year30MI2=0;												//F36
	if(term>=20)
	{
		if((dPayment2>=5)&&(dPayment2<10)) year30MI2=0.94;
		if((dPayment2>=10)&&(dPayment2<15)) year30MI2=0.62;
		if((dPayment2>=15)&&(dPayment2<20)) year30MI2=0.38;
		if(dPayment2>20) year30MI2=0;
	}else{
		year30MI2=0;
	}
	year30MI2=year30MI2/100;
	
	var year15MI2=0;												//E36
	if(term<=15){
		if(dPayment2<3.5){ year15MI2=0;}
		if((dPayment2>=3.5)&&(dPayment2<5)){ year15MI2=0.55;}
		if((dPayment2>=5)&&(dPayment2<10)){ year15MI2=0.84;}
		if((dPayment2>=10)&&(dPayment2<15)){ year15MI2=0.44;}
		if((dPayment2>=15)&&(dPayment2<20)){ year15MI2=0.34;}
		if(dPayment2>20){ year15MI2=0;}
	}else{
		year15MI2=-999;									//Why this weird number?
	}
	year15MI2=year15MI2/100;
	
	var totalPandI=0;
	totalPandI=maxLeft*maxDebt2;									//G36
	
	var MI2=1;														//H36
	if(year15MI2<0){
			MI2=year30MI2;
		}else{
			MI2=year15MI2;
		}
	
	var MITotal2=1;													//J36
	MITotal2=MI2*(b33/12);
	
	var totalPITI=0;												//K36
	totalPITI=MITotal2+totalPandI;				
	var ammountAfford=PV(totalPITI,rate/12,term*12) + moneyAvaliable; //L36			
	
	
	//Final Results
	var principalInterest=totalPandI;
	var hazardInsurance=(ammountAfford*0.5/100)/12;
	var propertyTaxes=(ammountAfford*2.6/100)/12;
	var mortgageInsurance=MITotal2;
	var totalMonthlyPayment=principalInterest+hazardInsurance+propertyTaxes+mortgageInsurance;
	
	//Inject Results into DOM
	$("#rMaxQualify").text( formatCurrency(ammountAfford.toFixed(2)));
	$("#rTotal").text( formatCurrency(totalMonthlyPayment.toFixed(2)));
	$("#rInterest").text( formatCurrency(principalInterest.toFixed(2)));
	$("#rTaxes").text( formatCurrency(propertyTaxes.toFixed(2)));
	$("#rHazard").text( formatCurrency(hazardInsurance.toFixed(2)));
	
	
	//Show Results
	$("#calc2Progress").fadeOut("slow");
	$("#calc2Result").fadeIn();
	
	 
	
	//debuging
	/*
	console.log("----------------Total Obligations-----------------------");
	console.log("Car Loans:",carLoans);
	console.log("Car Loans 1:",carLoan1);
	console.log("Car Loans 2:",carLoan2);
	console.log("Car Loans 3:",carLoan3);
	console.log("Installs:",installs);
	console.log("Total Obligations:", totalObligations);
	console.log("Max Left: ",maxLeft);
	console.log("P&I 1",PandI);
	console.log("B33",b33);
	console.log("M&I 1",MI1);
	console.log("M&I Total 1",MITotal1);
	console.log("Total P&I W/MI",totalPIMI1);
	console.log("Ammount Affort",totalPITI);
	console.log("Home Qualify:",homeQualify);
	console.log("Down Payment1:",dPayment1);
	console.log("Year30 MI1",year30MI1);
	console.log("Year15 MI1",year15MI1);
	console.log("Down Payment2:",dPayment2);
	console.log("MaxDept2",maxDebt2);
	console.log("Principal Int:",principalInterest); 
	*/
	return false;
}

function calc3(){
	
	//$("#calc3Progress").show();
	
	//consts
	
	//variables
	var price=$("input#price").val(); //Price
	var dpayment=$("#dpayment").val() //Down Payment
	var term=$("#term").val(); //Term
	var rate=0;
	
	if(term <='15'){
		rate=parseFloat($("#rate15").val());
	}
	else
	{
		rate=parseFloat($("#rate30").val());
	}

	//const vars
	var lammount=price-dpayment;
	var dPaymentRate=(dpayment/lammount)*100;
		
	//start calc
	var taxes=(lammount*(2.6/100))/12;
	var hazard=(lammount*(0.5/100))/12;
	//var interest=PMT(rate/100/12,term*12,lammount,0);
	var interest=calculate_payment(lammount,rate/100/12,term*12);
	var total=taxes+hazard+interest;
	
	if((dPaymentRate>=0)&&(dPaymentRate<3.5))
	{
		$("#calc3Notice").show();
		$("#calc3Result").hide();
		$("#calc3Progress").fadeOut("slow");
		return false;
	}
	else{
		$("#calc3Notice").hide();
	}
	//Inject results
	$("#rTerm").text(term);
	$("#rTaxes").text( formatCurrency(taxes.toFixed(2)));
	$("#rHazard").text( formatCurrency(hazard.toFixed(2)));
	$("#rInterest").text( formatCurrency(interest.toFixed(2)));
	$("#rTotal").text( formatCurrency(total.toFixed(2)));
	 
	//debuging
	/*
	console.log("------------------Calc Start---------------");
	console.log("lammount",lammount);	
	console.log("hazard",hazard); 
	console.log("dpayment rate",dPaymentRate); 
	*/
	
	$("#calc3Progress").fadeOut("slow");
	$("#calc3Result").fadeIn();
	return false;
}

function calc4(){
	
	//$("#calc4Progress").show();
	
	//consts
	
	//variables
	var lammount=$("input#lammount").val(); //Loan Amount
	var apayment=$("#aPayment").val(); //Additional Payment
	var term=$("#term").val(); //Term
	var rate=0;
	
	if(term <='15'){
		rate=parseFloat($("#rate15").val());
	}
	if(term > '15'){
		rate=parseFloat($("#rate30").val());
	}

	
	//start calc
	var payoff1=term;
	var payoff2=0;	
	//var monthlyPayment1=PMT(rate/100/12,term*12,lammount,0).toFixed(0);
	var monthlyPayment1=calculate_payment(lammount,rate/100/12,term*12).toFixed(2);
	var monthlyPayment2=parseFloat(monthlyPayment1)+parseFloat(apayment); 
	var interestSavings=0;
	var timeSaved=0;
	var paymentCount=term*12;
	
	//amortization table 
	var bBalance1=lammount, bBalance2 = lammount; //column1
	var interest1=0, interest2=0; //column5
	var principal1=0, principal2=0; //column4		
	var totalInterest1=0, totalInterest2 = 0;
	var ending1=0, ending2=1;
	var count = 0;
	
	for(i=0;i<paymentCount;i++)
	{
		interest1 = ((bBalance1 / 100) * (rate / 12)); //column5 
		principal1 = parseFloat(monthlyPayment1) - interest1; //column4   
		ending1 = bBalance1 - principal1;
		totalInterest1 += parseFloat(interest1);
		bBalance1 = ending1;
	}
	
	while(ending2>0)
	{
		//Additional
		interest2 = ((bBalance2 / 100) * (rate / 12)); //column5 
		principal2 = monthlyPayment2 - interest2; //column4   
		ending2 = bBalance2 - principal2;		
		totalInterest2 += interest2;
		bBalance2 = ending2;
		count++;
	}
	//count--;   //N5
	
	var o5=paymentCount-count; //O5
	/*
	var ae=12;
	while(ae<count){
		payoff2++;
		ae+=12;
	}
	*/
	payoff2=parseInt(o5/12);
	payoff2Months=o5 % 12;
	timeSaved=payoff1-payoff2;
	interestSavings=(totalInterest1-totalInterest2).toFixed(2);
	
	//Inject results
	$("#mPayment1").text( formatCurrency(monthlyPayment1));
	$("#mPayment2").text( formatCurrency(monthlyPayment2));
	$("#payoff1").text(payoff1);
	$("#payoff2").text(payoff2);
	if(payoff2Months > 0)
	{
		$("#payoff2Months").text(payoff2Months+" Months");
		$("#timeSavedMonths").text(payoff2Months+" Months");
	}
	$("#intPaid1").text( formatCurrency(totalInterest1));
	$("#intPaid2").text( formatCurrency(totalInterest2.toFixed(2)));
	$("#intSaved").text( formatCurrency(interestSavings));
	$("#timeSaved").text(timeSaved);
	 
	//debuging
	//console.log("------------------Calc Start---------------");
	//console.log("apayment",apayment);
	//console.log("mpyamnt1",monthlyPayment1); 
	//console.log("mpyamnt2",monthlyPayment2); 
	//console.log("dpayment rate",dPaymentRate); 
	
	$("#calc4Progress").fadeOut("slow");
	$("#calc4Result").fadeIn();
	return false;
}

function PMT (ir, np, pv, fv ) {
 /*
 ir - interest rate per month
 np - number of periods (months)
 pv - present value
 fv - future value (residual value)
 */
 pmt = ( ir * ( pv * Math.pow ( (ir+1), np ) ) ) / ( ( ir + 1 ) * ( Math.pow ( (ir+1), np) -1) );
 return pmt;
}
function PV(PMT,IR,NP){
	//PMT = Montly payment
	//IR = Interest rate (/12)
	//NP = Term Remaining (*12)
	IR=IR/100;
	var PV = PMT * (1 - Math.pow(1 + IR, -NP)) / IR
  	return Math.round(PV*100)/100 
}

function calculate_payment(PV, IR, NP) {
  var PMT = (PV * IR) / (1 - Math.pow(1 + IR, -NP));
  return PMT;
}