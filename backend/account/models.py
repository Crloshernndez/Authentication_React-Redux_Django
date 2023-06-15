from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    """
    Custom user account manager for the UserAccount model.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a user with the provided email and password.

        Args:
            email (str): Email address of the user.
            password (str, optional): User's password. Defaults to None.
            **extra_fields: Additional fields for the user.

        Raises:
            ValueError: If no email address is provided.

        Returns:
            UserAccount: Created user instance.
        """

        if not email:
            raise ValueError("User must have an email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user
    

    def create_superuser(self, email, password, **extra_fields):
        """
        Creates and saves a superuser with the provided email and password.

        Args:
            email (str): Email address of the superuser.
            password (str): Superuser's password.
            **extra_fields: Additional fields for the superuser.

        Returns:
            UserAccount: Created superuser instance.
        """

        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

# Create your models here.
class UserAccount(AbstractBaseUser, PermissionsMixin):
    
    email     = models.EmailField(max_length=255, unique=True)
    name      = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff  = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email