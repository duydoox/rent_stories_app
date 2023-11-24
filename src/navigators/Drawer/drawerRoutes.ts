import { useTheme } from '@/hooks';
import { BookManager, Home, RentBook, ReturnBook, Statistic } from '@/screens';
import { useTranslation } from 'react-i18next';
import { MainParamsList } from 'types/navigation';

export type PropsDrawerRoute = {
  route: keyof MainParamsList;
  lable: string;
  component: any;
  icon: number;
};

const useDrawerRoute = (): PropsDrawerRoute[] => {
  const { Images } = useTheme();
  const { t } = useTranslation(['example']);

  return [
    {
      route: 'Home',
      lable: t('home'),
      icon: Images.icons.home,
      component: Home,
    },
    {
      route: 'Book',
      lable: t('Books'),
      icon: Images.icons.story,
      component: BookManager,
    },
    {
      route: 'RentBook',
      lable: t('rent'),
      icon: Images.icons.rent,
      component: RentBook,
    },
    {
      route: 'ReturnBook',
      lable: t('pay'),
      icon: Images.icons.payment,
      component: ReturnBook,
    },
    {
      route: 'Statistic',
      lable: t('statistic'),
      icon: Images.icons.statistic,
      component: Statistic,
    },
  ];
};

export default useDrawerRoute;
