import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/Auth.vue';
import Basket from '../pages/Basket.vue';
import EditTrack from '../pages/EditTrack.vue';
import EditLicense from '../pages/EditLicense.vue';
import TrackItem from '../pages/TrackItem.vue';
import Tracks from '../pages/Tracks.vue';
import TracksEditor from '../pages/TracksEditor.vue';
import Licenses from '../pages/Licenses.vue';
import User from '../pages/User/User.vue';
import UserBalance from '../pages/User/UserBalance.vue';
import UserSettings from '../pages/User/UserSettings.vue';
import UserPurchase from '../pages/User/UserPurchase.vue';
import UserProfile from '../pages/UserProfile/UserProfile.vue';
import ProfileInfo from '../pages/UserProfile/ProfileInfo.vue';
import ProfileLicenses from '../pages/UserProfile/ProfileLicenses.vue';
import ProfileTracks from '../pages/UserProfile/ProfileTracks.vue';
import NotFound from '../pages/NotFound.vue';


const routes = [
  {
    path: '/',
    redirect: 'tracks',
  },
  {
    path: '/login',
    name: 'login',
    component: Auth,
  },
  {
    path: '/register',
    name: 'register',
    component: Auth,
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/editTrack/:id',
    component: EditTrack,
    meta: { 
      requiresAuth: true,
      isBeatmaker : true
    }
  },
  {
    path: '/addTrack',
    component: EditTrack,
    meta: { 
      requiresAuth: true,
      isBeatmaker : true
    }
  },
  {
    path: '/editLicense/:id',
    component: EditLicense,
    meta: { 
      requiresAuth: true,
      isBeatmaker : true
    }
  },
  {
    path: '/trackItem/:id',
    component: TrackItem,
  },
  {
    path: '/tracks',
    name: 'tracks',
    component: Tracks,
  },
  {
    path: '/tracksEditor',
    name: 'tracksEditor',
    component: TracksEditor,
    meta: { 
      requiresAuth: true,
      isBeatmaker : true
    }
  },
  {
    path: '/licenses',
    name: 'licenses',
    component: Licenses,
    meta: { 
      requiresAuth: true,
      isBeatmaker : true
    }
  },
  {
    path: '/user',
    component: User,
    meta: { 
      requiresAuth: true,
    },
    children: [
      {
        path: '/user/settings',
        component: UserSettings,
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: '/user/balance',
        purchase: UserBalance,
        meta: {
          requiresAuth: true,
          isBeatmaker : true,
        }
      },
      {
        path: '/user/purchase',
        component: UserPurchase,
        meta: {
          requiresAuth: true,
        }
      },
    ]
  },
  {
    path: '/userProfile/:id',
    component: UserProfile,
    children: [
      {
        path: '/userProfile/:id/info',
        component: ProfileInfo,
      },
      {
        path: '/userProfile/:id/tracks',
        component: ProfileTracks,
      },
      {
        path: '/userProfile/:id/licenses',
        component: ProfileLicenses,
      }
    ]
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})