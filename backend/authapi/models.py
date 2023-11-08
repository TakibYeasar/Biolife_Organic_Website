from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from rest_framework_simplejwt import tokens

class CustomManager(BaseUserManager):
    def create_user(self, username, email, password, first_name=None, last_name=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not username:
            raise ValueError('user has to have a username')
        
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    
    def get_user_pic_path(self):
        return f'user_pics/{self.username}/'
    
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    username = models.CharField(max_length=200, unique=True, blank=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    password = models.CharField(max_length=128, min_length=8, write_only=True, required=True)
    picture = models.ImageField(
        upload_to=get_user_pic_path, default='user_pics/dafault.png')
    last_logind = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    join_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    objects = CustomManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
    def tokens(self):
        return {
            'refresh': str(tokens.RefreshToken.for_user(self)),
            'access': str(tokens.RefreshToken.for_user(self).access_token)
        }

