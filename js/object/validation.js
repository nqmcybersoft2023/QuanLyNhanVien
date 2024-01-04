// Một số validation thường kiểm tra
// Dữ liệu rỗng, người dùng chưa nhập gì
// Định dạng email
// định dạng số
// định dạng chữ
// Định dạng mật khẩu: nhập trong mật khẩu phải có 1 ký tự chữ cái viết hoa và 1 ký tự đặc biệt

function checkEmptyValue(value, errorId) {
  // nếu đi vào được if sẽ là trường hợp người dùng đã nhập dữ liệu vào
  var elementTbao = document.getElementById(errorId);
  if (value != "" && elementTbao) {
    elementTbao.innerHTML = '';
    return true;
  } else {
    console.log('value rỗng');
    // trường hợp khi value rỗng
    elementTbao.innerHTML = 'Vui lòng không bỏ trống';
    elementTbao.style.display = 'block'
    return false;
  }
}

 
function checkEmailValue(value, errorId) {
  var regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  var checkEmail = regexEmail.test(value);

  var elementTbao = document.getElementById(errorId);

  if (checkEmail) {
    elementTbao.innerHTML = '';
    return true;
  } else {
    elementTbao.innerHTML = 'Vui lòng nhập đúng định dạng email';
    elementTbao.style.display = 'block';
    return false;
  }
}
 

function checkTenNhanVien(value, errorId) {
  const regex = /^[a-zA-Z\s]*$/;
  var isValid = regex.test(value.trim());
  if (isValid) {
    document.getElementById(errorId).innerHTML = '';
    return true;
  } else {
    document.getElementById(errorId).innerHTML = 'Vui lòng nhập tên nhân viên (chỉ chứa chữ cái)';
    return false;
  }
}

// function checkEmailValue(value, errorId) {
//   var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//   var checkEmail = regexEmail.test(value.trim());
//   if (checkEmail) {
//     document.getElementById(errorId).innerHTML = '';
//     return true;
//   } else {
//     document.getElementById(errorId).innerHTML = 'Vui lòng nhập đúng định dạng email';
//     return false;
//   }
// }

function checkMatKhau(value, errorId) {
  var regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,10}$/;
  var isValid = regex.test(value.trim());
  if (isValid) {
    document.getElementById(errorId).innerHTML = '';
    return true;
  } else {
    document.getElementById(errorId).innerHTML = 'Vui lòng nhập mật khẩu từ 6 đến 10 ký tự (chứa ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặc biệt)';
    return false;
  }
}