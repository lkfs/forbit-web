import CryptoJS from 'crypto-js';
/*
 * @name 加密
 *
 * @param data string 待加密数据字符串
 * @param secret string 秘钥
 * @param iv string 偏移量
 *
 * @return string 加密后字符串
 */
function toEncrypt(data, secret, iv) {
  // 加密
  var $secret = CryptoJS.enc.Utf8.parse(secret);
  var $iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, $secret, {
    iv: $iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  encrypted = encrypted.toString(); // 返回的是base64格式的密文
  return encrypted;
}

/*
 * @name 解密
 *
 * @param data string 待解密数据字符串
 * @param secret string 秘钥
 * @param iv string 偏移量
 *
 * @return string 解密后字符串
 */
function toDecrypt(data, secret, iv) {
  var $secret = CryptoJS.enc.Utf8.parse(secret);
  var $iv = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(data, $secret, {
    iv: $iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function md5(data) {
  return CryptoJS.MD5(data).toString();
}

const x = '0123456789qwertyuioplkjhgfdsazxcvbnm';
function random(length) {
  var rtn = '';
  for (var i = 0; i < length; i++) {
    rtn += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return rtn;
}

export { toEncrypt, toDecrypt, md5, random };
