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
  no_session: 7,
  unknown_error: 99
};
var successMsg = {
  success: '성공',
  short_parameter: '매개변수 부족',
  inner_error: '내부 함수 오류',
  external_error: '외부 API 오류',
  db_save_error: '디비 저장 오류',
  db_load_error: '디비 로딩 오류',
  no_session: '세션 정보가 없습니다.',
  unknown_error: '알 수 없는 오류'
};

var success = {
  success: successCode.success,
  msg: successMsg.success
};

var short_parameter = {
  success: successCode.short_parameter,
  msg: successMsg.short_parameter
};

var inner_error = {
  success: successCode.inner_error,
  msg: successMsg.inner_error
};

var external_error = {
  success: successCode.external_error,
  msg: successMsg.external_error
};

var db_save_error = {
  success: successCode.db_save_error,
  msg: successMsg.db_save_error
};

var db_load_error = {
  success: successCode.db_load_error,
  msg: successMsg.db_load_error
};

var no_session = {
  success: successCode.no_session,
  msg: successMsg.no_session
};
var unknown_error = {
  success: successCode.unknown_error,
  msg: successMsg.unknown_error
};

exports.success = success;
exports.short_parameter = short_parameter;
exports.inner_error = inner_error;
exports.external_error = external_error;
exports.db_save_error = db_save_error;
exports.db_load_error = db_load_error;
exports.no_session = no_session;
exports.unknown_error = unknown_error;

exports.successCode = successCode;
exports.successMsg = successMsg;
//Success Code
