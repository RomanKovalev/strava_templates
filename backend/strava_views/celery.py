from __future__ import absolute_import, unicode_literals
import logging
import os
from celery import Celery

# устанавливаем модуль настроек Django для celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'strava_views.settings')

app = Celery('strava_views')

# Используем строку настройки конфигурации
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.broker_connection_retry_on_startup = True
# Автоматически ищем задачи в каждом установленном приложении Django
app.autodiscover_tasks()

logger = logging.getLogger('celery')
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)