// var arrNhanVien = [];


// function getValueUser(event) {

//   // yêu cầu lấy dữ liệu từ input bên ngoài khi người dùng nhập xong và bấm thêm nhân viên
//   // event.preventDefault()
//   var arrInput = document.querySelectorAll('form input,form select');
//   console.log(arrInput);

//   // //     // gọi tới tất cả các thẻ span thông báo lỗi thông qua class sp-thongbao'
//   //   // chạy vòng lặp để lấy dữ liệu của từng phần tử
//   //   // xử lí khi đi qua từng phần tử

//   var nhanVien = new NhanVien();
//   var isValid = true;

//   for (var i = 0; i < arrInput.length; i++) {
//     if (arrInput[i].id == 'email') {
//       isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id) && checkEmailValue(arrInput[i].value, arrError[i].id)
//     }

//     //   // biến id nhận dữ liệu là những id của các thẻ được dom tới trong arrInput
//     isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id);  

//     var id = arrInput[i].id;

//     // thực hiện gọi tới các thuộc tính trong đối tượng nhân viên thông qua id và truyền dữ liệu vào
//     nhanVien[id] = arrInput[i].value;
//   }
var arrNhanVien = [];

function getValueUser(event) {
  var arrInput = document.querySelectorAll('form input, form select');
  var nhanVien = new NhanVien();
  var isValid = true;
  var arrError = document.querySelectorAll("form span.sp-thongbao");
  console.log(arrError);
  for (var i = 0; i < arrInput.length; i++) {
    var id = arrInput[i].id;
    if (arrInput[i].id == 'email') {
      isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id) && checkEmailValue(arrInput[i].value, arrError[i].id)
    } else if (arrInput[i].id == 'name') {
      isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id) && checkTenNhanVien(arrInput[i].value, arrError[i].id)
    }

  else if (arrInput[i].id == 'password') {
    isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id) && checkMatKhau(arrInput[i].value, arrError[i].id)
  }
  else { isValid &= checkEmptyValue(arrInput[i].value, arrError[i].id); }

  nhanVien[id] = arrInput[i].value;
}

if (isValid) {
  return nhanVien;
}
return null;
}

document.getElementById("btnThemNV").onclick = function (event) {
  event.preventDefault();
  // tạo ra một mảng chứa dữ liệu của nhanVien

  // lấy dữ liệu nhân viên trên từng input : hàm getValueUser
  var nhanVien = getValueUser();

  console.log(nhanVien);

  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    console.log(arrNhanVien);
    //   gọi dom tới thẻ form và sử dụng phương thức reset để xoá các dữ liệu đang có trên form
    document.getElementById("formQLNV").reset();
    // Lưu trữ dữ liệu mảng xuống local storage
    luuDuLieuLocalStorage("arrNhanVien", arrNhanVien);
    hienThiDuLieu();
  }

};

function hienThiDuLieu(arr) {
  if (arr == undefined) {
    arr = arrNhanVien;
  }
  // chạy vòng lặp qua từng phần tử trong mảng arrNhanVien
  // tạo ra những chuỗi html trong xử lí vòng lặp và cộng dồn vào một biến chung
  // gọi tới thẻ cha cần chứa nội dung và truyền đoạn chuỗi html vào cho thẻ cha đó
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nhanVien = arr[i];
    console.log(nhanVien);

    // Clone object (object dưới local sẽ đưa các thuộc tính vào object có chứa phương thức)
    // khởi tạo một đối tượng từ lớp đối tượng
    // phương thức Object.assign giúp copy các thuộc tính từ một object ban đầu qua object mới
    // chạy đưa dữ liệu lên giao diện thông qua object mới là sự kết hợp từ 2 object ban đầu
    var newNhanVien = new NhanVien();
    // Object.assign giúp thực hiện việc clone object (nhân bản), cần truyền 2 tham số, tham số thứ nhất là object được nhận, tham số thứ 2 là object được cho
    nhanVien = Object.assign(newNhanVien, nhanVien);

    content += `
    <tr>
      <td>${nhanVien.tknv}</td>
      <td>${nhanVien.name}</td>
      <td>${nhanVien.email}</td>
      <td>${nhanVien.datepicker}</td>
      <td>${nhanVien.chucVu}</td>
      <td>${nhanVien.tongLuong()}</td>
      <td>${nhanVien.xepLoai()}</td>
      <td>
        <button onclick="xoaDuLieuUser('${nhanVien.tknv
      }')" class="btn btn-danger">Xoá</button>
      <button onclick= "getInfoUser('${nhanVien.tknv
      }')"  class="btn btn-warning ml-3">Sửa</button>


    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}
// ------------LƯU DỮ LIỆU XUỐNG LOCAL-------------------

function luuDuLieuLocalStorage(key, value) {
  var stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

//................LẤY DỮ LIỆU LOCAL......................
function layDuLieuLocalStorage(key) {
  var dataLocal = localStorage.getItem("arrNhanVien");
  // kiểm tra xem dữ liệu lấy về có hay không
  if (dataLocal) {
    // xử lí hành động khi lấy được dữ liệu
    var convertData = JSON.parse(dataLocal);
    arrNhanVien = convertData;
    hienThiDuLieu();
  } else {
    // xử lí hành động khi không có dữ liệu để lấy
  }
}
layDuLieuLocalStorage();

// ------------TẠO HÀM XOÁ DỮ LIỆU
function xoaDuLieuUser(tknv) {
  console.log(tknv);
  var index = -1;
  // splice (vị trí bắt đầu xoá,số lượng cần xoá = 1)
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].tknv == tknv) {
      // chắc chắn nhân viên này là nhân viên cần xoá
      console.log(i);
      index = i;
    }
  }
  // Cấu trúc điều kiện
  if (index != -1) {
    // dùng hàm splice để xoá
    arrNhanVien.splice(index, 1);

    luuDuLieuLocalStorage("arrNhanVien", arrNhanVien);
    hienThiDuLieu();
  }
}
// ------------- Phân tích chức năng cập nhật sinh viên -----------------------
// Khi người dùng click vào nút sửa, sẽ lấy thông tin người dùng và đưa lên các input
// Thực hiện ngăn chặn người dùng chỉnh sửa mã sinh viên
// Sau khi người dùng đã chỉnh sửa thành công, sẽ thực hiện việc lấy thông tin người dùng sau khi chỉnh sửa và thay đổi với dữ liệu cũ
function getInfoUser(tknv) {
  var nhanVienIndex = arrNhanVien.find(function (nhanVien) {
    return nhanVien.tknv === tknv;
  });

  if (nhanVienIndex) {
    var arrInput = document.querySelectorAll("#myModal input, #myModal select");
    for (var z = 0; z < arrInput.length; z++) {
      var htmlDom = arrInput[z];
      var id = htmlDom.id;
      htmlDom.value = nhanVienIndex[id];
    }
  }

  $("#myModal").modal("show"); // Hiển thị modal sau khi đặt giá trị
}

function updateValueUser() {
  console.log("Huhu");
  // lấy dữ liệu trên input về trước
  var nhanVien = getValueUser();
  console.log(nhanVien);
  // tìm vị trí của dữ liệu cũ đang nằm trong mảng
  // var index = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (nhanVien.tknv == arrNhanVien[i].tknv) {
      arrNhanVien[i] = nhanVien;
    }
  }
  luuDuLieuLocalStorage("arrNhanVien", arrNhanVien);
  hienThiDuLieu();
  document.getElementById("formQLNV").reset();
  document.getElementById("tknv").readOnly = false;
  // thay thế dữ liệu mới vào
}

document.getElementById("btnCapNhat").onclick = updateValueUser;

// -------------TÌM KIẾM-------------
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnTimNV').addEventListener('click', function () {
    var searchValue = document.getElementById('searchName').value.toLowerCase();
    var tableRows = document.querySelectorAll('#tableDanhSach tr');

    for (var i = 0; i < tableRows.length; i++) {
      var rowData = tableRows[i].querySelectorAll('td');
      var found = false;

      for (var j = 0; j < rowData.length; j++) {
        var cellData = rowData[j].textContent.toLowerCase();
        if (cellData.indexOf(searchValue) > -1) {
          found = true;
          break;
        }
      }

      if (found) {
        tableRows[i].style.display = '';
      } else {
        tableRows[i].style.display = 'none';
      }
    }
  });
  hienThiDuLieu();
});
