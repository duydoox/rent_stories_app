import { useTheme } from '@/hooks';
import { Example } from '@/screens';
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
      component: Example,
    },
    {
      route: 'Book',
      lable: 'Quản lý sách',
      icon: Images.icons.story,
      component: Example,
    },
    {
      route: 'RentBook',
      lable: 'Tạo phiếu mượn',
      icon: Images.icons.rent,
      component: Example,
    },
    {
      route: 'ReturnBook',
      lable: 'Trả sách',
      icon: Images.icons.payment,
      component: Example,
    },
    {
      route: 'Statistic',
      lable: 'Thống kê',
      icon: Images.icons.statistic,
      component: Example,
    },
  ];
};

export default useDrawerRoute;
