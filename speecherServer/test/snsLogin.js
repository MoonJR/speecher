/**
 * Created by MoonJR on 2015. 10. 14..
 */
var snsLogin = require('../routes/snsLogin');


describe('User', function () {
  describe('#login Test()', function () {
    it('페이스북 로그인 테스트', function (done) {
      var token = 'CAATtXB6EiJ8BACUqXDFggcEUatElubHAhM9AflkJlyYEnOVc36FSZAInJbeaxzUE3gO8L5r9cEUZAZA9UZAU7e69dyk9t0ZCwTEZCtyEN71zpZAHxvijnydz6XL6f5ZAIXKuxT51wFDq91eZBlJO3gfZA4mJSaZB4leG3cr8INKxn6GPkrXJ3ggi8p3impaBg85zXfCZAcxMQTZCkC5UkU6gwhHNa';
      snsLogin.getFaceBookData(token, function (respone) {
        if (respone != null || typeof respone == 'undefined') {
          console.log(respone);
          if (typeof respone.email == 'undefined') {
            console.error('이메일 가져오지 못함!');
          } else if (typeof respone.name == 'undefined') {
            console.error('이름 가져오지 못함!');
          } else if (typeof respone.id == 'undefined') {
            console.error('아이디 가져오지 못함!');
          } else {
            console.log(respone);
            done();
          }
        } else {
          console.error('페이스북에서 데이터를 가져오지 못함!');
        }
      });
    });

    it('구글 로그인 테스트', function (done) {
      var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3ZGI0NDlmMWUyN2ZkYTBkYjcxZDU3NzdlYTVjZGM2NDM1MmQ1ZjMifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6ImxVeGZGWDl2NGViTi1CaGRVWFRWcVEiLCJhdWQiOiIyODAyMzM3NDg0MTgtdjRzMXFqZWtubWIwbHA2dG8xNDJiYmx2NGFiMHJqY3YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI4Nzc5NTIyMTIyMzQ5NTM4MjEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMjgwMjMzNzQ4NDE4LXY0czFxamVrbm1iMGxwNnRvMTQyYmJsdjRhYjByamN2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJqYWlzb25vaEBnbWFpbC5jb20iLCJpYXQiOjE0NDQ4MjM2OTYsImV4cCI6MTQ0NDgyNzI5NiwibmFtZSI6IkphaXNvbiBPaCIsImdpdmVuX25hbWUiOiJKYWlzb24iLCJmYW1pbHlfbmFtZSI6Ik9oIiwibG9jYWxlIjoia28ifQ.Uv5iVH9iw_MKIZ2Pf4UNPobuB2ZM92CCPbDD7-iqxgxqAWZwyGiOoaea4Drp_gi5HLUu2g4nIi8OWN2qyTyk02rCEpYjn_GK8HV7F5AQVapmYHT8Yyg0jpfCVngPZisc4F0Q9IuJ0ytF9-8qLcAkdS08PRK8haAWGquPqht6DDF8ztnytII2YXrt0dRjgm4gLprYsagFAWgiu-IEex9YoY9Lvrq6x2YSlr4To9lXjqr9v4Heg1MrGu_Lyz_4w6AFr9u6q4eANX9sc8pVKFyuMpOBGTN_BLILQCUOvb9V3se-zl2r7mS3Fq2Xr6O1KbAqCLTKfuHs5M_yanIn2voZuQ';
      snsLogin.getGooglePlusData(token, function (respone) {
        console.log(respone);
        if (respone != null || typeof respone == 'undefined') {
          if (typeof respone.email == 'undefined') {
            console.error('이메일 가져오지 못함!');
          } else if (typeof respone.name == 'undefined') {
            console.error('이름 가져오지 못함!');
          } else if (typeof respone.id == 'undefined') {
            console.error('아이디 가져오지 못함!');
          } else {
            console.log(respone);
            done();
          }
        } else {
          console.error('구글에서 데이터를 가져오지 못함!');
        }
      });
    });

  });


});


