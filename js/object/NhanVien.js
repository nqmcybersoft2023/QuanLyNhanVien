    function NhanVien(tknv, name, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongThang) {
    this.tknv = tknv || '';
    this.name = name || '';
    this.email = email || '';
    this.password = matKhau || '';
    this.datepicker = ngayLam || '';
    this.luongCB = luongCoBan || 0;
    this.chucVu = chucVu || '';
    this.gioLam = gioLamTrongThang || 0;

    // Phương thức tính tổng lương
    this.tongLuong = function () {
        var tongLuong = '';
        if (this.chucVu === 'Giám đốc') {
            tongLuong = this.luongCB * 3;
        } else if (this.chucVu === 'Trưởng phòng') {
            tongLuong = this.luongCB * 2;
        } else {
            tongLuong = this.luongCB * 1;
        }
        return tongLuong;
    };

    // Phương thức xếp loại nhân viên
    this.xepLoai = function () {
        var xepLoai = '';
        if (this.gioLam > 80 && this.gioLam >= 192) {
            xepLoai = 'Xuất sắc';
        } else if (this.gioLam > 80 && this.gioLam >= 176) {
            xepLoai = 'Giỏi';
        } else if (this.gioLam > 80 && this.gioLam >= 160) {
            xepLoai = 'Khá';
        } else   {
            xepLoai = 'Trung bình';
        }
        return xepLoai;
    };
}
