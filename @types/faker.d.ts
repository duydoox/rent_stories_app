export type CuaHang = {
  id: string;
  tenCuaHang: string;
  diaChi: string;
  moTa: string;
};

export type Truyen = {
  id: string;
  tenTruyen: string;
  namSanXuat: number;
  tacGia: string;
  giaThue: number;
  soLuong: number;
  ghiChu: string;
  cuaHang: Partial<Shop>;
};

export type NhanVien = {
  id: string;
  ten: string;
  username: string;
  password: string;
  viTri: 'NV' | 'QL';
  soDienThoai: string;
  diaChi: string;
  ngaySinh: string;
  gioiTinh: 'male' | 'female';
  cuaHang: Partial<Shop>;
};

export type KhachHang = {
  id: string;
  tenKhachHang: string;
  soDienThoai: string;
};

export type TruyenDuocThue = {
  id: string;
  soLuong: number;
  giaThue: number;
  tongTien: number;
  ngayThue: string;
  ngayTra: string;
  truyen: Partial<Truyen>;
  phieuThue: Partial<PhieuThue>;
};

export type PhieuThue = {
  id: string;
  ghiChu: string;
  tongTien: number;
  nhanVien: Partial<NhanVien>;
  khachHang: Partial<KhachHang>;
  truyenDuocThue: Partial<TruyenDuocThue>[];
};

export type HoaDon = {
  id: string;
  ngayTaoHoaDon: string;
  tienPhat: number;
  tongTien: number;
  ghiChu: string;
  nhanVien: NhanVien;
  phieuThue: Partial<PhieuThue>;
};
