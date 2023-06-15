from pathlib import Path
import os
import environ
from datetime import timedelta

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG')

ALLOWED_HOSTS = []


# Application definition

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',  
]

PROJECT_APPS = [
    'account',
    ]

THIRD_PARTY_APPS = [
    'corsheaders',
    'rest_framework',
    'djoser',
    'rest_framework_simplejwt'
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'HOST': os.environ.get('HOST'),
        'USER': os.environ.get('USERDB'),
        'ENGINE': os.environ.get('ENGINE'),
        'NAME': os.environ.get('TABLE_NAME'),
        'PASSWORD': os.environ.get('PASSWORD'),
        'PORT': 5432
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework.authentication.TokenAuthentication'
    ),
}

DJOSER = {
    'LOGIN_FIELD' : 'email', # Name of a field in User model to be used as login field
    'USER_CREATE_PASSWORD_RETYPE': True, # If True, you need to pass re_password to /users/ endpoint, to validate password equality
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True, # If True, change username endpoints will send confirmation email to user.
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True, # If True, change password endpoints will send confirmation email to user.
    'SEND_CONFIRMATION_EMAIL': True, # If True, register or activation endpoint will send confirmation email to user.
    'SEND_ACTIVATION_EMAIL': True, # If True user will be required to click activation link sent in email after: creating an account , updating their email
    'SET_PASSWORD_RETYPE': True, # If True, you need to pass re_new_password to /users/set_password/ endpoint, to validate password equality.
    'SET_USERNAME_RETYPE': True, # If True, you need to pass re_new_username to /users/set_username/ endpoint, to validate username equality.
    'PASSWORD_RESET_CONFIRM_RETYPE': True, # If True, you need to pass re_new_password to /users/reset_password_confirm/ endpoint in order to validate password equality.
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user_create' : 'account.serializer.UserSerializer',
        'user'        : 'account.serializer.UserSerializer',
        'current_user': 'account.serializer.UserSerializer',
        'user_delete' : 'djoser.serializers.UserDeleteSerializer',
    },
}

SIMPLE_JWT = {
    # 'AUTH_HEADER_TYPES': ('JWT', ),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10080), 
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True, 
    'BLACKLIST_AFTER_ROTATION': True, 
    'AUTH_TOKEN_CLASSES': ( 
      'rest_framework_simplejwt.tokens.AccessToken',
    )
}


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = 'static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'account.UserAccount'

# EMAIL
# EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST          = 'smtp.gmail.com'
# EMAIL_PORT          = 587
# EMAIL_HOST_USER     = os.environ.get('USER_EMAIL_HOST')
# EMAIL_HOST_PASSWORD = os.environ.get('USER_EMAIL_PASSWORD')
# EMAIL_USE_TLS       = True
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST_DEV')
CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS_DEV')

if not DEBUG:
    CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST_DEPLOY')
    CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS_DEPLOY')