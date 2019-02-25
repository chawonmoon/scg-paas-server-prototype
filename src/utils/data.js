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
    payOffUnitInfo1.year +
    '' +
    (payOffUnitInfo1.month >= 10
        ? payOffUnitInfo1.month
        : '0' + payOffUnitInfo1.month);
// 청구월
payOffUnitInfo1.chargeMonth =
    payOffUnitInfo1.year +
    '' +
    (payOffUnitInfo1.month >= 10
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
    payOffUnitInfo2.year +
    '' +
    (payOffUnitInfo2.month >= 10
        ? payOffUnitInfo2.month
        : '0' + payOffUnitInfo2.month);
// 청구월
payOffUnitInfo2.chargeMonth =
    payOffUnitInfo2.year +
    '' +
    (payOffUnitInfo2.month >= 10
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

/*

    table page scroll data

*/

data.tableScrollData = [];
for (let index = 0; index < 110; index++) {
    data.tableScrollData.push({
        id: index + 1,
        name: '이름' + (index + 1),
        platform: index % 2 === 0 ? 'ios' : 'android'
    });
}

/*

    image page scroll data

*/

data.imageScrollData = [];
for (let index = 0; index < 110; index++) {
    data.imageScrollData.push({
        id: index + 1,
        name: '사진' + (index + 1),
        platform: index % 2 === 0 ? 'ios' : 'android'
    });
}

/*

    게시글 : Restful Api

*/

data.boardList = [];

/*

    현재 위치 기준으로 가장 가까운 계측기 정보

*/

data.nearInfo = {
    content: '<div>광화문 역사박물관</div>',
    lat: 37.5722072,
    lng: 126.972091,
    pm1p0: 10,
    pm2p5: 20,
    pm10: 22,
    devno: '007',
    distance: 50,
    hourDataDetail: {
        pm1p0: [10, 21, 35, 40, 80, 10, -1],
        pm2p5: [10, 25, 37, 40, 80, 10, -1],
        pm10: [29, 30, 31, 81, 151, 29, -1]
    }
};

/*
    
    지도 cluster data

*/

data.mapClusterData = {
    positions: [
        {
            lat: 37.27943075229118,
            lng: 127.01763998406159
        },
        {
            lat: 37.55915668706214,
            lng: 126.92536526611102
        },
        {
            lat: 35.13854258261161,
            lng: 129.1014781294671
        },
        {
            lat: 37.55518388656961,
            lng: 126.92926237742505
        },
        {
            lat: 35.20618517638034,
            lng: 129.07944301057026
        },
        {
            lat: 37.561110808242056,
            lng: 126.9831268386891
        },
        {
            lat: 37.86187129655063,
            lng: 127.7410250820423
        },
        {
            lat: 37.47160156778542,
            lng: 126.62818064142286
        },
        {
            lat: 35.10233410927457,
            lng: 129.02611815856181
        },
        {
            lat: 35.10215562270429,
            lng: 129.02579793018205
        },
        {
            lat: 35.475423012251106,
            lng: 128.76666923366042
        },
        {
            lat: 35.93282824693927,
            lng: 126.95307628834287
        },
        {
            lat: 36.33884892276137,
            lng: 127.393666019664
        },
        {
            lat: 37.520412849636,
            lng: 126.9742764161581
        },
        {
            lat: 35.155139675209675,
            lng: 129.06154773758374
        },
        {
            lat: 35.816041994696576,
            lng: 127.11046706211324
        },
        {
            lat: 38.20441110638504,
            lng: 128.59038671285234
        },
        {
            lat: 37.586112739308916,
            lng: 127.02949148517999
        },
        {
            lat: 37.50380641844987,
            lng: 127.02130716617751
        },
        {
            lat: 37.55155704387368,
            lng: 126.92161115892036
        },
        {
            lat: 37.55413060051369,
            lng: 126.92207472929526
        },
        {
            lat: 36.362321615174835,
            lng: 127.35000483225389
        },
        {
            lat: 37.55227862908755,
            lng: 126.92280546294998
        },
        {
            lat: 37.490413948014606,
            lng: 127.02079678472444
        },
        {
            lat: 35.172358507549596,
            lng: 126.90545394866643
        },
        {
            lat: 35.15474103200252,
            lng: 129.11827889154455
        },
        {
            lat: 37.516081250973485,
            lng: 127.02369057166361
        },
        {
            lat: 36.80711722863776,
            lng: 127.14020346037576
        },
        {
            lat: 37.28957415752673,
            lng: 127.00103752005424
        },
        {
            lat: 35.83953896766896,
            lng: 128.7566880321854
        },
        {
            lat: 37.51027412948879,
            lng: 127.08227718124704
        },
        {
            lat: 37.493581783270294,
            lng: 126.72541955660554
        },
        {
            lat: 35.135291862962795,
            lng: 129.10060911448775
        },
        {
            lat: 35.174574933144065,
            lng: 126.91389980787773
        },
        {
            lat: 37.795887691878654,
            lng: 127.10660416587146
        },
        {
            lat: 37.59288687521181,
            lng: 126.96560524627377
        },
        {
            lat: 37.45076411130452,
            lng: 127.14593003749792
        },
        {
            lat: 35.86008337557079,
            lng: 127.1263912488061
        },
        {
            lat: 35.23773491330953,
            lng: 129.08371037429578
        },
        {
            lat: 37.524297321304886,
            lng: 127.05018281937049
        },
        {
            lat: 36.33386658021849,
            lng: 127.4461721466889
        },
        {
            lat: 35.72963747546802,
            lng: 128.27079056365005
        },
        {
            lat: 36.02726828142973,
            lng: 129.37257233594056
        },
        {
            lat: 35.0708030360945,
            lng: 129.0593185494088
        },
        {
            lat: 35.86835862950247,
            lng: 128.59755089175871
        },
        {
            lat: 33.51133264696746,
            lng: 126.51852347452322
        },
        {
            lat: 37.61284289586752,
            lng: 127.03120547238589
        },
        {
            lat: 35.851696038722466,
            lng: 128.59092937125666
        },
        {
            lat: 37.59084695083232,
            lng: 127.01872773588882
        },
        {
            lat: 35.52114874288784,
            lng: 129.33573629945764
        },
        {
            lat: 36.362326407439845,
            lng: 127.33577420148076
        },
        {
            lat: 37.28941189110747,
            lng: 127.00446132665141
        },
        {
            lat: 35.32049801117398,
            lng: 129.1810343576788
        },
        {
            lat: 37.53338631541601,
            lng: 127.00615481678061
        },
        {
            lat: 37.413461468258156,
            lng: 126.67735680840826
        },
        {
            lat: 35.920390371093205,
            lng: 128.54411720249956
        },
        {
            lat: 36.65489374054824,
            lng: 127.48374816871991
        },
        {
            lat: 37.49491987110441,
            lng: 127.01493134206048
        },
        {
            lat: 37.64985695608336,
            lng: 127.14496345268074
        },
        {
            lat: 37.55686770317417,
            lng: 127.16927880543041
        },
        {
            lat: 37.37014007589146,
            lng: 127.10614330185591
        },
        {
            lat: 37.5350236507627,
            lng: 126.96157681184789
        },
        {
            lat: 37.40549630594667,
            lng: 126.8980581820004
        },
        {
            lat: 34.867950544005744,
            lng: 128.69069690081176
        },
        {
            lat: 35.16317059543225,
            lng: 128.98452978748048
        },
        {
            lat: 36.607484825953186,
            lng: 127.48520451195111
        },
        {
            lat: 37.651724785213986,
            lng: 126.58306748337554
        },
        {
            lat: 35.86059690063427,
            lng: 128.59193087665244
        },
        {
            lat: 35.25685847585025,
            lng: 128.59912605060455
        },
        {
            lat: 33.509258155694496,
            lng: 126.5109451464813
        },
        {
            lat: 37.64366155701157,
            lng: 126.63255039247507
        },
        {
            lat: 35.82667262227336,
            lng: 127.1030670574823
        },
        {
            lat: 35.82003554991111,
            lng: 127.14810974062483
        },
        {
            lat: 35.097485195649455,
            lng: 128.99486181862338
        },
        {
            lat: 37.32204249590605,
            lng: 127.95591893585816
        },
        {
            lat: 37.50535127272031,
            lng: 127.1047465440526
        },
        {
            lat: 36.99081407156533,
            lng: 127.09338324956647
        },
        {
            lat: 37.323486640444834,
            lng: 127.12285239871076
        },
        {
            lat: 35.78973089440451,
            lng: 127.13644319545601
        },
        {
            lat: 35.641373953578196,
            lng: 129.35463220719618
        },
        {
            lat: 37.47423127310911,
            lng: 126.97625029161996
        },
        {
            lat: 35.84357192991226,
            lng: 128.61143720719716
        },
        {
            lat: 37.180974984085736,
            lng: 128.20294526341132
        },
        {
            lat: 37.57895718642583,
            lng: 126.9316897337244
        },
        {
            lat: 33.49077253755052,
            lng: 126.49314817000993
        },
        {
            lat: 36.42175925330255,
            lng: 128.67409133225766
        },
        {
            lat: 37.46405540570109,
            lng: 126.7153544119173
        },
        {
            lat: 37.594758776232126,
            lng: 127.10099917489818
        },
        {
            lat: 37.7239966558994,
            lng: 127.0478671731854
        },
        {
            lat: 35.86680171505329,
            lng: 128.5923738376741
        },
        {
            lat: 37.560573727266785,
            lng: 126.81239107485251
        },
        {
            lat: 37.78692224857484,
            lng: 126.98966010341789
        },
        {
            lat: 35.10368644802913,
            lng: 129.0206862606022
        },
        {
            lat: 37.063839948992644,
            lng: 127.06856523030079
        },
        {
            lat: 37.34344643728643,
            lng: 127.94382181350932
        },
        {
            lat: 37.512521267219064,
            lng: 127.40054805648133
        },
        {
            lat: 35.15286653837983,
            lng: 126.90419903971498
        },
        {
            lat: 35.173238445546296,
            lng: 129.176082844468
        },
        {
            lat: 36.082394201323524,
            lng: 129.40330471725923
        },
        {
            lat: 37.51043665598106,
            lng: 127.03974070036524
        },
        {
            lat: 36.627816673285054,
            lng: 127.44969866021904
        },
        {
            lat: 37.59194624756919,
            lng: 127.01817545576053
        },
        {
            lat: 37.387147045560866,
            lng: 127.1253365438929
        },
        {
            lat: 35.89948383848115,
            lng: 128.60809550730653
        },
        {
            lat: 37.555316235235324,
            lng: 127.14038447894715
        },
        {
            lat: 36.09622092762977,
            lng: 128.43314679004078
        },
        {
            lat: 37.582855922985544,
            lng: 126.91907857008522
        },
        {
            lat: 37.516000983841586,
            lng: 128.72798872032757
        },
        {
            lat: 37.48429363675198,
            lng: 127.0379630203579
        },
        {
            lat: 37.54502575965604,
            lng: 126.95429338245707
        },
        {
            lat: 35.236247173046394,
            lng: 128.8677618015292
        },
        {
            lat: 37.40157536691968,
            lng: 127.11717457214067
        },
        {
            lat: 36.95191038001258,
            lng: 127.91064040877527
        },
        {
            lat: 37.491526492971346,
            lng: 126.85463749525812
        },
        {
            lat: 36.124356479753196,
            lng: 128.09517052346138
        },
        {
            lat: 37.15715169307048,
            lng: 128.15853461363773
        },
        {
            lat: 37.5808156608605,
            lng: 126.95109705510639
        },
        {
            lat: 37.46931787249714,
            lng: 126.89904775044873
        },
        {
            lat: 35.52195614910054,
            lng: 129.3209904841746
        },
        {
            lat: 37.58625703195563,
            lng: 126.9496035206742
        },
        {
            lat: 37.28463639199199,
            lng: 126.85984474757359
        },
        {
            lat: 35.534169458631226,
            lng: 129.31169021536095
        },
        {
            lat: 37.553341234194285,
            lng: 127.15481222237025
        },
        {
            lat: 37.62293367990081,
            lng: 126.83445005122417
        },
        {
            lat: 35.5272027005698,
            lng: 127.72953798950101
        },
        {
            lat: 35.180032285898854,
            lng: 128.06954509175367
        }
    ]
};

data.dustInfos = [
    {
        content: '<div>공덕역</div>',
        lat: 37.5468697,
        lng: 126.9521717,
        pm1p0: 10,
        pm2p5: 20,
        pm10: 22,
        devno: '0001',
        hourDataDetail: {
            pm1p0: [10, 21, 35, 40, 80, 10, -1],
            pm2p5: [10, 25, 37, 40, 80, 10, -1],
            pm10: [29, 30, 31, 81, 151, 29, -1]
        }
    },
    {
        content: '<div>서울도시가스</div>',
        lat: 37.5474865,
        lng: 126.8705989,
        pm1p0: 11,
        pm2p5: 25,
        pm10: 30,
        devno: '0002',
        hourDataDetail: {
            pm1p0: [10, 21, 35, 40, 80, 10, 0],
            pm2p5: [10, 21, 35, 40, 80, 10, 0],
            pm10: [29, 30, 31, 81, 151, 29, 0]
        }
    },
    {
        content: '<div>강남역</div>',
        lat: 37.4979462,
        lng: 127.025427,
        pm1p0: 70,
        pm2p5: 77,
        pm10: 35,
        devno: '0003',
        dustLevel: 1,
        hourData: [2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 3, 3, 2, 2],
        hourDataDetail: {
            pm1p0: [31, 31, 31, 81, 81, 31, 31, 31, 31, 31, 81, 81, 31, 31],
            pm2p5: [31, 31, 31, 81, 81, 31, 31, 31, 31, 31, 81, 81, 31, 31],
            pm10: [31, 31, 31, 81, 81, 31, 31, 31, 31, 31, 81, 81, 31, 31]
        }
    },
    {
        content: '<div>서울도시가스(마포사옥)</div>',
        lat: 37.557936,
        lng: 126.9160013,
        pm1p0: 32,
        pm2p5: 37,
        pm10: 22,
        devno: '0004',
        hourDataDetail: {
            pm1p0: [31, 31, 31, 81, 81, 31, 31, 31, 31, 31, 81, 81, 31, 10],
            pm2p5: [31, 31, 31, 81, 81, 31, 31, 31, 31, 31, 81, 81, 13, 10],
            pm10: [151, 151, 151, 90, 90, 75, 75, 75, 75, 75, 130, 130, 75, 75]
        }
    },
    {
        content: '<div>공덕오피스타</div>',
        lat: 37.5494149,
        lng: 126.9582094,
        pm1p0: 32,
        pm2p5: 37,
        pm10: 22,
        devno: '0005',
        hourDataDetail: {
            pm1p0: [30, 15, 15, 15, 29, 60, 55, 53, 53, 53, 90, 100, 50, 50],
            pm2p5: [30, 15, 15, 15, 29, 60, 55, 53, 53, 53, 90, 100, 50, 50],
            pm10: [30, 15, 15, 15, 29, 60, 55, 53, 53, 53, 90, 100, 50, 50]
        }
    },
    {
        content: '<div>석남 경남아너스빌</div>',
        lat: 37.4997875,
        lng: 126.6667296,
        pm1p0: 32,
        pm2p5: 37,
        pm10: 22,
        devno: '0006',
        hourDataDetail: {
            pm1p0: [
                11,
                11,
                11,
                11,
                1,
                11,
                31,
                32,
                32,
                32,
                32,
                32,
                83,
                83,
                83,
                83,
                83,
                83,
                154,
                154,
                154,
                154,
                154,
                154
            ],
            pm2p5: [
                11,
                11,
                11,
                11,
                1,
                11,
                31,
                32,
                32,
                32,
                32,
                32,
                83,
                83,
                83,
                83,
                83,
                83,
                154,
                154,
                154,
                154,
                154,
                154
            ],
            pm10: [
                11,
                11,
                11,
                11,
                1,
                11,
                31,
                32,
                32,
                32,
                32,
                32,
                83,
                83,
                83,
                83,
                83,
                83,
                154,
                154,
                154,
                154,
                154,
                154
            ]
        }
    }
];

/*

    image page scroll data

*/

data.selectSearchData = [];
for (let index = 0; index < 100; index++) {
    data.selectSearchData.push({
        id: index + 1 + 'A',
        name: '안용성' + (index + 1),
        dept: index % 2 === 0 ? 'scglab' : '신규사업팀'
    });
    data.selectSearchData.push({
        id: index + 1 + 'H',
        name: '황승연' + (index + 1),
        dept: index % 2 === 0 ? 'scglab' : '신규사업팀'
    });
}

/*

    darganddrop 데이터

*/

data.dragdropData = [];
for (let dragdropDataIndex = 0; dragdropDataIndex < 10; dragdropDataIndex++) {
    data.dragdropData.push({
        id: _.uniqueId('dragtest_'),
        name: 'drag ' + (dragdropDataIndex + 1),
        sortIndex: dragdropDataIndex
    });
}

module.exports = data;
