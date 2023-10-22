import { useTheme } from '@/hooks';
import { BookManager, Home, RentBook, ReturnBook, Statistic } from '@/screens';
import { MainParamsList } from 'types/navigation';

export type PropsDrawerRoute = {
  route: keyof MainParamsList;
  lable: string;
  component: any;
  icon: number;
};

const useDrawerRoute = (): PropsDrawerRoute[] => {
  const { Images } = useTheme();

  return [
    {
      route: 'Home',
      lable: 'Trang chủ',
      icon: Images.icons.home,
      component: Home,
    },
    {
      route: 'Book',
      lable: 'Quản lý sách',
      icon: Images.icons.story,
      component: BookManager,
    },
    {
      route: 'RentBook',
      lable: 'Tạo phiếu mượn',
      icon: Images.icons.rent,
      component: RentBook,
    },
    {
      route: 'ReturnBook',
      lable: 'Trả sách',
      icon: Images.icons.payment,
      component: ReturnBook,
    },
    {
      route: 'Statistic',
      lable: 'Thống kê',
      icon: Images.icons.statistic,
      component: Statistic,
    },
  ];
};

export default useDrawerRoute;
