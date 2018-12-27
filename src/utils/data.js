'use strict';

const _ = require('lodash');

const data = {};

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
        chartUnitInfo.date = year + '' + month >= 10 ? month : '0' + month;
        // 청구월
        chartUnitInfo.chargeMonth =
            year + '' + month >= 10 ? month : '0' + month;
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
    payOffUnitInfo1.year + '' + payOffUnitInfo1.month >= 10
        ? payOffUnitInfo1.month
        : '0' + payOffUnitInfo1.month;
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
    payOffUnitInfo2.year + '' + payOffUnitInfo2.month >= 10
        ? payOffUnitInfo2.month
        : '0' + payOffUnitInfo2.month;
// 청구월
payOffUnitInfo2.chargeMonth =
    payOffUnitInfo2.year + '' + payOffUnitInfo2.month >= 10
        ? payOffUnitInfo2.month
        : '0' + payOffUnitInfo2.month;
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
    data.realtimePayInfos.push(realtimePayInfo);
}

module.exports = data;
