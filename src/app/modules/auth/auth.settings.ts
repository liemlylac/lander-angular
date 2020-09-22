import { NbAuthOAuth2JWTToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from '../../../environments/environment';

export const authSettings = {
  guest: {},
  user: {
    parent: 'guest',
    view: ['current-user'],
    edit: ['current-user']
  },
  admin: {
    parent: 'user',
    view: ['current-user', 'users'],
    edit: ['current-user', 'users']
  }
};

export const socialLinks = [
  {
    url: '#',
    target: '_blank',
    icon: 'github'
  },
  {
    url: '#',
    target: '_blank',
    icon: 'facebook'
  },
  {
    url: '#',
    target: '_blank',
    icon: 'twitter'
  }
];

export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.apiHttpUrl,
      token: {
        class: NbAuthOAuth2JWTToken,
        key: 'accessToken'
      },
      login: {
        endpoint: '/auth/login',
        method: 'post'
      },
      register: {
        endpoint: '/auth/register',
        method: 'post'
      },
      logout: {
        endpoint: '/auth/logout',
        method: 'post'
      },
      requestPass: {
        endpoint: '/auth/request-password',
        method: 'post'
      },
      resetPass: {
        endpoint: '/auth/reset-password',
        method: 'post'
      },
      refreshToken: {
        endpoint: '/auth/refresh-token',
        method: 'post'
      }
    })
  ],
  forms: {
    login: {
      socialLinks
    },
    register: {
      socialLinks
    },
    validation: {
      fullName: {
        required: true,
        minLength: 6,
        maxLength: 20
      }
    }
  }
};
