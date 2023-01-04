const axios_error_handler = error => {
  if (error.response) {
    // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.

    console.error('요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.');
    console.log(JSON.stringify(error.response.data, null, '\t'));
    console.log(JSON.stringify(error.response.status, null, '\t'));
    console.log(JSON.stringify(error.response.headers, null, '\t'));
  } else if (error.request) {
    console.error('요청이 전송되었지만, 응답이 수신되지 않았습니다.');
    // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
    // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
    // node.js에서는 http.ClientRequest 인스턴스입니다.

    console.log(JSON.stringify(error.request, null, '\t'));
  } else {
    // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
    console.error('오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.');
    console.log(JSON.stringify(error.message, null, '\t'));
  }
  console.error('error config');
  console.log(JSON.stringify(error.config, null, '\t'));
};

export default axios_error_handler;
