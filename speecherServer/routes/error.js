/**
 * Created by MoonJR on 2015. 10. 28..
 */
//Success Code
var successCode = {
  success: 1,
  short_parameter: 2,
  inner_error: 3,
  external_error: 4,
  db_save_error: 5,
  db_load_error: 6,
  unknown_error: 99
};
var successMsg = {
  success: '성공',
  short_parameter: '매개변수 부족',
  inner_error: '내부 함수 오류',
  external_error: '외부 API 오류',
  db_save_error: '디비 저장 오류',
  db_load_error: '디비 로딩 오류',
  unknown_error: '알 수 없는 오류'
};

exports.successCode = successCode;
exports.successMsg = successMsg;
//Success Code
