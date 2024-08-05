# Generated by Django 5.0.6 on 2024-07-18 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0002_alter_syncingactivitiesdata_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='average_heartrate',
            field=models.IntegerField(default=None),
        ),
        migrations.AddField(
            model_name='activity',
            name='average_temp',
            field=models.FloatField(default=None),
        ),
        migrations.AddField(
            model_name='activity',
            name='max_heartrate',
            field=models.IntegerField(default=None),
        ),
    ]
