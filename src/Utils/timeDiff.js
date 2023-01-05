function getTimeDiff(date, now = new Date()) {
  // 두 일자(startTime, endTime) 사이의 차이를 구한다.
  var dateGap = now.getTime() - date.getTime();
  var timeGap = new Date(0, 0, 0, 0, 0, 0, now - date);

  // 두 일자(startTime, endTime) 사이의 간격을 "일-시간-분"으로 표시한다.
  var diffDay = Math.floor(dateGap / (1000 * 60 * 60 * 24)); // 일수
  var diffHour = timeGap.getHours(); // 시간
  var diffMin = timeGap.getMinutes(); // 분
  var diffSec = timeGap.getSeconds(); // 초

  return (
    (diffDay >= 1 ? `${Math.floor(diffDay)}일 ` : '') +
    (diffHour >= 1 ? `${Math.floor(diffHour)}시간 ` : '') +
    (diffMin >= 1 ? `${Math.floor(diffMin)}분 ` : '') +
    (diffSec >= 1 ? `${Math.floor(diffSec)}초 ` : '')
  );
}

export {getTimeDiff};
