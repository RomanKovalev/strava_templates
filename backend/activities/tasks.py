from celery import shared_task
from activities.utilites import get_activities, get_activities1
import logging

logger = logging.getLogger('celery')


@shared_task
def add():
    logger.info(f'Executing task: add()')
    for i in range(1, 4):
        get_activities1()