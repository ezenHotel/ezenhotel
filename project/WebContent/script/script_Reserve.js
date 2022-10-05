/**
 * 
 */

/* 페이지 로딩 시 reserve.jsp 페이지라면 호텔 선택 활성화하기 */
function pageLoading(){
	let url = $(location).attr('href'); 
	if(url.includes("reserve.jsp")){
		let clsName = url.split("?hCode=").reverse()[0];
		clsName = clsName.split("&")[0];
		
		let liHotel = document.getElementById(clsName);
		let liChild = liHotel.firstChild;
		
		liHotel.style.backgroundColor="#896825";
		liChild.style.color = "#ffffff";
		
	}
}

/* 페이지 로딩 시 reserveInsert.jsp 페이지라면 호텔 선택 활성화하기 */
function pageLoadChkHotel(){
	let url = $(location).attr('href'); 
	if(url.includes("reserveInsert.jsp")){
		let chkHotel = url.split("?hCode=").reverse()[0];
		chkHotel = chkHotel.split("&")[0];
		
		console.log(chkHotel);
		document.getElementById("hCodeNum").value=chkHotel;
		
		let sel = document.getElementById("hotelName");
		let selLength = sel.options.length;
		
		for(let i=0; i<selLength; i++){
			if(sel.options[i].value == chkHotel){
				sel.options[i].selected = "true";
			}
		}
		
		if(chkHotel.substring(0,1) == "H"){
			document.getElementById("HorR").innerText = "호텔 - ";
		}else if(chkHotel.substring(0,1) == "L"){
			document.getElementById("HorR").innerText = "리조트 - ";
		}
	}
}

$(function(){

	/* 달력에서 '예약하기' 버튼 클릭 시 예약 페이지로 이동 */
	$("button.resvBtn").click(function(){
		let loginID = $("#loginID").val();
		console.log(loginID);
		let rCode = $(this).val();
		let resvDate = $(this).next().val();
		let hCode = $(this).next().next().val();
		
		if(loginID != "" && loginID != "null"){
			$("form#calendarFrm").attr("action", "/reserve/reserveInsert.jsp?hCode="+hCode+"&rCode="+rCode+"&resvDate="+resvDate).submit();			
		}else{
			alert("로그인 후 이용해주세요.");
			location.href="/login/login.jsp";
		}
	});
	
	// reserveInsert.jsp 드롭박스의 호텔 변경 시마다 객실 정보 변경 함수 
	$("select#hotelName").change(function(){
		let hCode = $(this).val();
		console.log(hCode);
		let hType = hCode.substring(0,1);
		console.log(hType);
		// 호텔 변경 시에 리조트인지 호텔인지 구분
		if(hType == "H"){
			$("span#HorR").text("호텔 - ");
		}else if(hType == "L"){
			$("span#HorR").text("리조트 - ");
		}
		$("input#hCodeNum").val(hCode);
		//console.log("/reserve/reserveRoomInfoProc.jsp?hCode="+hCode);
	
		// 호텔 변경 시마다 변경한 호텔 코드를 다시 가져와 해당 호텔로 페이지 리로드
		let url = $(location).attr('href');
		console.log("url : " + url);
		
		// 현재 페이지 url을 가져와 hCode 앞부분은 url 변수에 재 선언 후 
		// 변경한 호텔 코드를 넣고
		// 이후 url 파라미터를 그 뒤에 붙여줌
		// 그 후 페이지 재로드
		let chkHCode = url.split("?hCode=").reverse()[0];
		chkHCode = chkHCode.split("&");
		// console.log("url 파라미터 값 배열 [] : "+chkHCode);
		
		let chUrl = url.split("?hCode=")[0];
		chUrl += "?hCode="+hCode;
		// 첫번째 값은 이전 호텔 코드이기 때문에 chkHCode[0] 값은 뺴고 for문 돌려 url에 파라미터 넣어주기
		for(let i=1; i<chkHCode.length; i++){
			//console.log("chkHCode[i] : "+ chkHCode[i]);
			chUrl += "&" + chkHCode[i];
		}
		console.log("변경한 호텔 URL : " + chUrl);
		window.location.replace(chUrl);
		//$("form#changeRoomInfo").attr("action", "/reserve/reserveRoomInfoProc.jsp").submit();
		
	});
	
	// 객실 선택 한가지만 가능하도록(체크박스 다중 선택 불가)
	$("input.chkRCode").click(function(){
		if($(this).prop("checked")){
			$("input.chkRCode").prop("checked", false);
			$(this).prop("checked", true);
		}
	});
	
	// '예약하기' 버튼 submit 실행 및 유효성 검사 진행
	$("button#resvConfirmBtn").click(function(){
		let phone2 = $("#phone2").val();
		let phone3 = $("#phone3").val();
		
		let chkLength = $(".chkRCode").length;
		let chkCnt = 0;
		for(let i=0; i<chkLength; i++){
			if($(".chkRCode").eq(i).prop("checked")){
				chkCnt++; 
				console.log(chkCnt);
			}
		}
		
		if(chkCnt == 0 ){
			alert("객실을 선택해주세요. ");
		}else if(phone2=="" || phone3==""){
			alert("핸드폰 번호를 입력해주세요. ");
		} else {
			$("form#changeRoomInfo").attr("action", "/reserve/reserveInsertProc.jsp").submit();
		}
	});
	
	
	//input 핸드폰 번호 숫자만 입력
    $(".phone").on("keyup", function(event) {
        if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {
            
        }else{
            alert('숫자만 입력해주세요.');
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        }
    });
	
	
});












		/*let todayDate = new Date();
		
		let month = todayDate.getMonth()+1;
		
		if(month < 10){
			month = "0"+month;
		}
		let day = todayDate.getFullYear() + "-" + month + "-" + todayDate.getDate();*/