import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = "parallax_admin"          
email = "burykh_2000@mail.ru"       
password = "TiTaN2025"       

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Суперпользователь {username} создан")
else:
    print(f"Суперпользователь {username} уже существует")