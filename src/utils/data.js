'use strict';

const _ = require('lodash');

const data = {};

/*

    안전점검 이력조회

*/

data.safeHistory = [];
for (let safeHistoryIndex = 0; safeHistoryIndex < 10; safeHistoryIndex++) {
    let safeHistoryInfo = {};
    safeHistoryInfo.checkDate = '20181011';
    safeHistoryInfo.checkResult = safeHistoryIndex % 2 === 0 ? 1 : 2;
    safeHistoryInfo.checkReason =
        safeHistoryIndex % 2 === 0 ? null : '다시확인요망';
    data.safeHistory.push(safeHistoryInfo);
}

/*

    2016 ~ 2018년까지 월 차트 데이터 가공

*/
let allMonthChartData = [];
let totalUseGas = 0;
let totalChargeAmt = 0;
let totalDueAmt = 0;
for (let year = 2016; year <= 2018; year++) {
    for (let month = 1; month <= 12; month++) {
        let chartUnitInfo = {};
        chartUnitInfo.year = year;
        chartUnitInfo.month = month;
        chartUnitInfo.date = year + '' + (month >= 10 ? month : '0' + month);
        // 청구월
        chartUnitInfo.chargeMonth =
            year + '' + (month >= 10 ? month : '0' + month);
        // 청구금액
        chartUnitInfo.chargeAmt = chartUnitInfo.chargeAmt = _.random(
            5000,
            50000
        );
        // 미납금액
        chartUnitInfo.dueAmt = _.random(3000, 25000);
        // 사용량
        chartUnitInfo.useGas = _.random(0, 100);
        allMonthChartData.push(chartUnitInfo);
        totalUseGas = totalUseGas + chartUnitInfo.useGas;
        totalChargeAmt = totalChargeAmt + chartUnitInfo.chargeAmt;
        totalDueAmt = totalDueAmt + chartUnitInfo.dueAmt;
    }
}

data.allMonthChartData = allMonthChartData;
data.totalUseGas = totalUseGas;
data.totalChargeAmt = totalChargeAmt;
data.totalDueAmt = totalDueAmt;

/*

    월 상세 정보

*/

let monthDetailInfos = [];
_.forEach(allMonthChartData, chartInfo => {
    let detailInfo = {};
    detailInfo.date = chartInfo.date;
    detailInfo.chartInfo = chartInfo;
    detailInfo.monthBasic = {
        useDateRangeBefore: '2018년 01월 01월',
        useDateRangeAfter: '2018년 02월 01월',
        paymentDeadline: '20190107',
        address: '인천시 서구 석남동 ****, *****'
    };
    detailInfo.claimDetail = {
        basicAmt: _.random(0, 5000),
        useAmt: _.random(0, 50000),
        vatAmt: _.random(0, 2000),
        cutAmt: _.random(0, 500)
    };
    detailInfo.userInfo = {
        contractNo: '06641-38300',
        customerNo: '10031-67478',
        thisRuleUse: _.random(200, 300),
        beforeRuleUse: _.random(200, 300),
        thisUse: _.random(200, 300),
        supportFactor: _.random(0.1, 0.9),
        beforeUse: _.random(0, 100),
        beforeWinterUse: _.random(0, 100),
        beforeUsePercent: _.random(0, 100),
        beforeWinterUsePercent: _.random(0, 100)
    };
    detailInfo.depositAccount = [
        { bankName: '우리은행', bankAccountNo: '12312345-456789' },
        { bankName: '기업은행', bankAccountNo: '12312345-456789' },
        { bankName: 'SC은행', bankAccountNo: '12312345-456789' }
    ];
    detailInfo.payHistory = [
        { label: '당월 청구금액', value: 21250 },
        { label: '당월 납부금액', value: null },
        { label: '당월 미납금액', value: 21250 },
        { label: '납부 방법', value: null },
        { label: '납부 일', value: null }
    ];
    detailInfo.recentUseChartData = [];
    detailInfo.compareChartData = [];
    for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
        let recentUseChartInfo = {};
        recentUseChartInfo.useGas = _.random(0, 100);
        recentUseChartInfo.useAmt = _.random(0, 50000);
        recentUseChartInfo.month = monthIndex;
        detailInfo.recentUseChartData.push(recentUseChartInfo);

        let compareUseChartInfo = {};
        compareUseChartInfo.month = monthIndex;
        compareUseChartInfo.thisUseGas = _.random(0, 100);
        compareUseChartInfo.beforeUseGas = _.random(0, 100);
        detailInfo.compareChartData.push(compareUseChartInfo);
    }
    detailInfo.notice = '<div>안내문입니다</div>';
    monthDetailInfos.push(detailInfo);
});

data.monthDetailInfos = monthDetailInfos;

/*
    
    미납내역 조회

*/

let totalPayOffUseGas = 0;
let totalPayOffChargeAmt = 0;
let totalPayOffDueAmt = 0;
let payOffHistoryInfo = [];
let payOffUnitInfo1 = {};
payOffUnitInfo1.year = 2018;
payOffUnitInfo1.month = 11;
payOffUnitInfo1.date =
    payOffUnitInfo1.year + '' + payOffUnitInfo1.month >= 10
        ? payOffUnitInfo1.month
        : '0' + payOffUnitInfo1.month;
// 청구월
payOffUnitInfo1.chargeMonth =
    payOffUnitInfo1.year + '' + (payOffUnitInfo1.month >= 10
        ? payOffUnitInfo1.month
        : '0' + payOffUnitInfo1.month);
// 청구금액
payOffUnitInfo1.chargeAmt = payOffUnitInfo1.chargeAmt = _.random(5000, 50000);
// 미납금액
payOffUnitInfo1.dueAmt = _.random(3000, 25000);
// 사용량
payOffUnitInfo1.useGas = _.random(0, 100);
payOffHistoryInfo.push(payOffUnitInfo1);

totalPayOffUseGas = totalPayOffUseGas + payOffUnitInfo1.useGas;
totalPayOffChargeAmt = totalPayOffChargeAmt + payOffUnitInfo1.chargeAmt;
totalPayOffDueAmt = totalPayOffDueAmt + payOffUnitInfo1.dueAmt;

let payOffUnitInfo2 = {};
payOffUnitInfo2.year = 2018;
payOffUnitInfo2.month = 11;
payOffUnitInfo2.date =
    payOffUnitInfo2.year + '' + (payOffUnitInfo2.month >= 10
        ? payOffUnitInfo2.month
        : '0' + payOffUnitInfo2.month);
// 청구월
payOffUnitInfo2.chargeMonth =
    payOffUnitInfo2.year + '' + (payOffUnitInfo2.month >= 10
        ? payOffUnitInfo2.month
        : '0' + payOffUnitInfo2.month);
// 청구금액
payOffUnitInfo2.chargeAmt = payOffUnitInfo2.chargeAmt = _.random(5000, 50000);
// 미납금액
payOffUnitInfo2.dueAmt = _.random(3000, 25000);
// 사용량
payOffUnitInfo2.useGas = _.random(0, 100);
payOffHistoryInfo.push(payOffUnitInfo2);

totalPayOffUseGas = totalPayOffUseGas + payOffUnitInfo2.useGas;
totalPayOffChargeAmt = totalPayOffChargeAmt + payOffUnitInfo2.chargeAmt;
totalPayOffDueAmt = totalPayOffDueAmt + payOffUnitInfo2.dueAmt;

data.payOffHistoryInfo = payOffHistoryInfo;

data.totalPayOffUseGas = totalPayOffUseGas;
data.totalPayOffChargeAmt = totalPayOffChargeAmt;
data.totalPayOffDueAmt = totalPayOffDueAmt;

/*

    납부 실시간 조회
     -은행/카드
     -카드 번호
     -납부 일시
     -총 납부금액
     -캐시 할인
     -결제 금액
     -거래 구분

*/

data.realtimePayInfos = [];

for (
    let realtimePayInfoIndex = 0;
    realtimePayInfoIndex < 3;
    realtimePayInfoIndex++
) {
    let realtimePayInfo = {};
    realtimePayInfo.payKind = 1;
    realtimePayInfo.cardNo = '1234-****-****-4567';
    realtimePayInfo.payDate = '2018-01-01';
    realtimePayInfo.totalPayAmt = 13990;
    realtimePayInfo.contractKind = 2;
    data.realtimePayInfos.push(realtimePayInfo);
}

/*

    가스 요금표(요약,상세)

*/

data.gasTariffSimpleInfos = [];
data.gasTariffDetailInfos = [];

for (let gasTariffIndex = 0; gasTariffIndex < 10; gasTariffIndex++) {
    let gasTariffSimpleInfo = {
        id: gasTariffIndex,
        date: '2018-01-2' + gasTariffIndex,
        content: '2018년 08월01일자 경기지역요금 단가표'
    };
    let gasTariffDetailInfo = {
        id: gasTariffIndex,
        date: '2018-01-2' + gasTariffIndex,
        content: '2018년 08월01일자 경기지역요금 단가표 상세 정보입니다'
    };
    data.gasTariffSimpleInfos.push(gasTariffSimpleInfo);
    data.gasTariffDetailInfos.push(gasTariffDetailInfo);
}

/*

    홈 정보
     1.청구요금 조회
     2.실시간 요금 계산
     3.최근납부
     4.주요 업무
     5.사용계약번호 관리

*/

/* 청구요금 조회 */

data.homeInfos = [];
let homeInfo1 = {};
homeInfo1.homeType = 1;
homeInfo1.homeSimpleContent = {};
homeInfo1.homeSimpleContent.payDeadLine = '01월01일';
homeInfo1.homeSimpleContent.labelUserName = '정*관';
homeInfo1.homeSimpleContent.labelMonth = '1월';
homeInfo1.homeSimpleContent.chargeAmt = 21250;
homeInfo1.homeSimpleContent.recentMonthChartData = [];

for (let month = 10; month <= 12; month++) {
    let chartUnitInfo = {};
    chartUnitInfo.year = 2018;
    chartUnitInfo.month = month;
    chartUnitInfo.date = 2018 + '' + (month >= 10 ? month : '0' + month);
    // 청구월
    chartUnitInfo.chargeMonth = 2018 + '' + (month >= 10 ? month : '0' + month);
    // 청구금액
    chartUnitInfo.chargeAmt = chartUnitInfo.chargeAmt = _.random(5000, 50000);
    // 사용량
    chartUnitInfo.useGas = _.random(0, 100);
    homeInfo1.homeSimpleContent.recentMonthChartData.push(chartUnitInfo);
}

/* 실시간 요금 계산 */

let homeInfo2 = {};
homeInfo2.homeType = 2;
homeInfo2.homeSimpleContent = {};
homeInfo2.homeSimpleContent.beforeUseGas = 476;
homeInfo2.homeSimpleContent.thisUseGas = 0;

/* 최근 납부 */

let homeInfo3 = {};
homeInfo3.homeType = 3;
homeInfo3.homeSimpleContent = {};
homeInfo3.homeSimpleContent.labelUserName = '정*관';
homeInfo3.homeSimpleContent.list = [];

for (let month = 8; month <= 12; month++) {
    let detailInfo = {};
    detailInfo.year = 2018;
    detailInfo.month = month;
    detailInfo.date = 2018 + '' + (month >= 10 ? month : '0' + month);
    // 청구월
    detailInfo.chargeMonth = 2018 + '' + (month >= 10 ? month : '0' + month);
    // 청구금액
    detailInfo.chargeAmt = detailInfo.chargeAmt = _.random(5000, 50000);
    // 사용량
    detailInfo.useGas = _.random(0, 100);
    // 납부정보
    detailInfo.payKind = 1;
    homeInfo3.homeSimpleContent.list.push(detailInfo);
}

/* 주요업무 */

let homeInfo4 = {};
homeInfo4.homeType = 4;
homeInfo4.label = '모바일 고객센터 주요 업무';
homeInfo4.homeSimpleContent = {};
homeInfo4.homeSimpleContent.list = [
    '가스요금',
    '전기요금',
    '간편 조회',
    '실시간 요금계산',
    '요금 납부',
    '상담톡',
    '방문예약',
    '이사',
    '가스관련 신고'
];

/* 주요업무 */

let homeInfo5 = {};
homeInfo5.homeType = 5;
homeInfo5.label = '부모님 댁 가스 요금도 함께 조회 OK~';
homeInfo5.homeSimpleContent = {};
homeInfo5.homeSimpleContent.bodyContent =
    '우리 집은 물론 가족들 집까지 손쉽게 관리할 수 있어요';

data.homeInfos.push(homeInfo1);
data.homeInfos.push(homeInfo2);
data.homeInfos.push(homeInfo3);
data.homeInfos.push(homeInfo4);
data.homeInfos.push(homeInfo5);

module.exports = data;
