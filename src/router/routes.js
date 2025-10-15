// routes.js
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

import CompanyList from '../pages/AskQuestion/List';
import AddCompany from '../pages/AskQuestion/AddUpdate';
import CompanyDetails from '../pages/AskQuestion/Details';

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

import JobList from '../pages/MyLawyers/List.jsx';
import JobDetails from '../pages/MyLawyers/Details.jsx';
import AddJob from '../pages/MyLawyers/AddUpdate.jsx';

import SystemUserList from '../pages/system_users/List';
import AddSystemUser from '../pages/system_users/AddUpdate';

import RoleList from '../pages/roles/List';
import AddRole from '../pages/roles/AddUpdate';

import ItemList from '../pages/items/List';
import AddItem from '../pages/items/AddUpdate';
import ItemDetails from '../pages/items/Details';

import AddonList from '../pages/addons/List';
import AddAddon from '../pages/addons/AddUpdate';

import UserList from '../pages/Chat/List.jsx';
import UserDetails from '../pages/Chat/Details.jsx';
import UserEdit from '../pages/Chat/Edit.jsx';

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
        path: '/ask-question',
        component: CompanyList,
        meta: { requiresAuth: true , hideHeader: false,  permission:'list-questions' }
    },
    {
        path: '/ask-question/create/:id?',
        component: AddCompany,
        meta: { requiresAuth: true , hideHeader: false, permission:'create-questions' }
    },
    {
        path: '/ask-question/:id',
        component: CompanyDetails,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-questions'  }
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
        path: '/my-lawyers',
        component: JobList,
        meta: { requiresAuth: true , hideHeader: false , permission:'list-lawyers'  }
    },
    {
        path: '/my-lawyers/:id',
        component: JobDetails,
        meta: { requiresAuth: true , hideHeader: false , permission:'detail-lawyers' }
    },
    {
        path: '/my-lawyers/create/:id?',
        component: AddJob,
        meta: { requiresAuth: true , hideHeader: false, permission:'create-lawyers' }
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
        path: '/chat/',
        component: UserList,
        meta: { requiresAuth: true , hideHeader: false }
    },
    {
        path: '/chat/detail/:id',
        component: UserDetails,
        meta: { requiresAuth: true , hideHeader: false  }
    },
    {
        path: '/chat/edit/',
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
