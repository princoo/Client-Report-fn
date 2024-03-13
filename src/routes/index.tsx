import Reports from '../pages/reports/Reports';
import SupportGroup from '../pages/supportGroup/SupportGroup';
import HomeVisit from '../pages/homeVisit/HomeVisit';
import WeeklyPlan from '../pages/weeklyPlan/Weeklyplan';

const coreRoutes = [
  {
    path: '/client/*',
    title: 'client',
    component: Reports,
  },
  {
    path: '/supportgroup/*',
    title: 'supportGroup',
    component: SupportGroup,
  },
  {
    path: '/homevisit/*',
    title: 'homeVisit',
    component: HomeVisit,
  },
  {
    path: '/weeklyplan/tasks/*',
    title: 'Tasks',
    component: WeeklyPlan,
  },
];

const routes = [...coreRoutes];
export default routes;
