export type CuaHang = {
  maCuaHang: string;
  tenCuaHang: string;
  diaChi: string;
  moTa: string;
};

export type Truyen = {
  maTruyen: string;
  tenTruyen: string;
  namSanXuat: number;
  tacGia: string;
  giaThue: number;
  soLuong: number;
  ghiChu: string;
  cuaHang: Partial<Shop>;
};

export type NhanVien = {
  maNhanVien: string;
  tenNhanVien: string;
  username: string;
  viTri: 'NV' | 'QL';
  soDienThoai: string;
  diaChi: string;
  ngaySinh: string;
  gioiTinh: 'male' | 'female';
  cuaHang: Partial<Shop>;
};

export type KhachHang = {
  maKhachHang: string;
  tenKhachHang: string;
  soDienThoai: string;
};

export type TruyenDuocThue = {
  maTruyenDuocThue: string;
  giaThue: number;
  tongTien: number;
  ngayThue: string;
  ngayPhaiTra: string;
  truyen: Partial<Truyen>;
  phieuThue: Partial<PhieuThue>;
};

export type PhieuThue = {
  maPhieuThue: string;
  ghiChu: string;
  nhanVien: Partial<NhanVien>;
  khachHang: Partial<KhachHang>;
  truyenDuocThue: Partial<TruyenDuocThue>[];
};

export type TruyenDuocTra = {
  maTruyenDuocTra: string;
  tienPhat: number;
  tienDaTra: number;
  ngayTra: Date;
  lyDoPhat: string;
  truyenDuocThue: TruyenDuocThue;
  hoaDon: HoaDon;
};

export type HoaDon = {
  maHoaDon: string;
  tongTien: number;
  ghiChu: string;
  nhanVien: NhanVien;
  truyenDuocTras: TruyenDuocTra[];
};
