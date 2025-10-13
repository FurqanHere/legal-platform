// routes.js
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

import CompanyList from '../pages/comapnies/List';
import AddCompany from '../pages/comapnies/AddUpdate';
import CompanyDetails from '../pages/comapnies/Details';

import PostList from '../pages/posts/List.jsx';
import PostDetails from '../pages/posts/Details.jsx';
import AddPost from '../pages/posts/AddUpdate.jsx';

import CategoryList from '../pages/categories/List';
import AddCategory from '../pages/categories/AddUpdate';

import BusinessTypeList from '../pages/business_types/List';
import AddBusinessType from '../pages/business_types/AddUpdate';

import ServiceList from '../pages/services/List';
import AddService from '../pages/services/AddUpdate';

import SkillList from '../pages/skills/List';
import AddSkill from '../pages/skills/AddUpdate';

import BannerList from '../pages/banners/List';
import AddBanner from '../pages/banners/AddUpdate';

import JobList from '../pages/jobs/List';
import JobDetails from '../pages/jobs/Details';
import AddJob from '../pages/jobs/AddUpdate';

import SystemUserList from '../pages/system_users/List';
import AddSystemUser from '../pages/system_users/AddUpdate';

import RoleList from '../pages/roles/List';
import AddRole from '../pages/roles/AddUpdate';

import ItemList from '../pages/items/List';
import AddItem from '../pages/items/AddUpdate';
import ItemDetails from '../pages/items/Details';

import AddonList from '../pages/addons/List';
import AddAddon from '../pages/addons/AddUpdate';

import UserList from '../pages/users/List';
import UserDetails from '../pages/users/Details';
import UserEdit from '../pages/users/Edit.jsx';

import Account from '../pages/Account';
import NotFound from '../pages/NotFound'; 
import CheckoutForm from '../pages/CheckoutForm'; 
import Setting from '../pages/Setting';

import WebsiteList from '../pages/websites/List';
import AddWebsite from '../pages/websites/AddUpdate';
import WebsiteDetails from '../pages/websites/Details';


const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, hideHeader: false }
    },
    {
        path: '/login',
        component: Login,
        meta: { requiresAuth: false, hideHeader: true }
    },
  
    {
        path: '/companies',
        component: CompanyList,
        meta: { requiresAuth: true , hideHeader: false,  permission:'list-companies' }
    },
    {
        path: '/companies/create/:id?',
        component: AddCompany,
        meta: { requiresAuth: true , hideHeader: false, permission:'create-companies' }
    },
    {
        path: '/companies/:id',
        component: CompanyDetails,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-companies'  }
    },

    {
        path: '/posts',
        component: PostList,
        meta: { requiresAuth: true , hideHeader: false,  permission:'list-posts' }
    },
    {
        path: '/posts/:id',
        component: PostDetails,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-posts'  }
    },
    {
        path: '/posts/create/:id?',
        component: AddPost,
        meta: { requiresAuth: true , hideHeader: false, permission:'create-posts' }
    },


    {
        path: '/items',
        component: ItemList,
        meta: { requiresAuth: true , hideHeader: false, permission:'list-items' }
    },
    {
        path: '/items/create/:id?',
        component: AddItem,
        meta: { requiresAuth: true , hideHeader: false, permission:'create-items' }
    },
    {
        path: '/items/:id',
        component: ItemDetails,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-items'  }
    },

    {
        path: '/addons',
        component: AddonList,
        meta: { requiresAuth: true , hideHeader: false, permission:'list-addons'  }
    },
    {
        path: '/addons/create/:id?',
        component: AddAddon,
        meta: { requiresAuth: true , hideHeader: false , permission:'create-addons' }
    },


    {
        path: '/banners/',
        component: BannerList,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-banners'  }
    },
    {
        path: '/banners/create/:id?',
        component: AddBanner,
        meta: { requiresAuth: true , hideHeader: false , permission:'create-banners'  }
    },
  
    {
        path: '/categories/',
        component: CategoryList,
        meta: { requiresAuth: true , hideHeader: false  , permission:'list-categories'  }
    },
    {
        path: '/categories/create/:id?',
        component: AddCategory,
        meta: { requiresAuth: true , hideHeader: false  , permission:'create-categories'  }
    },

    {
        path: '/business_types/',
        component: BusinessTypeList,
        meta: { requiresAuth: true , hideHeader: false  , permission:'list-business_types'  }
    },
    {
        path: '/business_types/create/:id?',
        component: AddBusinessType,
        meta: { requiresAuth: true , hideHeader: false  , permission:'create-business_types'  }
    },
    {
        path: '/services/',
        component: ServiceList,
        meta: { requiresAuth: true , hideHeader: false  , permission:'list-services'  }
    },
    {
        path: '/services/create/:id?',
        component: AddService,
        meta: { requiresAuth: true , hideHeader: false  , permission:'create-services'  }
    },
    {
        path: '/skills/',
        component: SkillList,
        meta: { requiresAuth: true , hideHeader: false  , permission:'list-skills'  }
    },
    {
        path: '/skills/create/:id?',
        component: AddSkill,
        meta: { requiresAuth: true , hideHeader: false  , permission:'create-skills'  }
    },
 

   
    {
        path: '/jobs/',
        component: JobList,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-jobs'  }
    },
    {
        path: '/jobs/:id',
        component: JobDetails,
        meta: { requiresAuth: true , hideHeader: false , permission:'detail-jobs' }
    },
    {
        path: '/jobs/create/:id?',
        component: AddJob,
        meta: { requiresAuth: true , hideHeader: false, permission:'create-jobs' }
    },

 
 
    // {
    //     path: '/orders/:id',
    //     component: OrderDetails,
    //     meta: { requiresAuth: true , hideHeader: false , permission:'detail-orders' }
    // },



    {
        path: '/checkout',
        component: CheckoutForm,
        meta: { requiresAuth: false , hideHeader: true }
    },

    {
        path: '/users/',
        component: UserList,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/users/detail/:id',
        component: UserDetails,
        meta: { requiresAuth: true , hideHeader: false  }
    },
    {
        path: '/users/edit/',
        component: UserEdit,
        meta: { requiresAuth: true , hideHeader: false  }
    },
   
    {
        path: '/system-users/',
        component: SystemUserList,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/system-users/create/:id?',
        component: AddSystemUser,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/roles/',
        component: RoleList,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/roles/create/:id?',
        component: AddRole,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/account/',
        component: Account,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/settings/',
        component: Setting,
        meta: { requiresAuth: true , hideHeader: false }
    },

    {
        path: '/websites',
        component: WebsiteList,
        meta: { requiresAuth: true, hideHeader: false, permission: 'read-websites' }
    },
    {
        path: '/websites/create/:id?',
        component: AddWebsite,
        meta: { requiresAuth: true, hideHeader: false, permission: 'create-websites' }
    },
    {
        path: '/websites/:id',
        component: WebsiteDetails,
        meta: { requiresAuth: true, hideHeader: false, permission: 'read-websites' }
    },

    {
        path: '*',
        component: NotFound,
        meta: { requiresAuth: true , hideHeader: false }
    },
];

export default routes;
