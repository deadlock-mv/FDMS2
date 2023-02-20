# Generated by Django 4.1.6 on 2023-02-14 14:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0005_alter_foodorder_customerid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foodorder',
            name='customerid',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='orders', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='foodorder',
            name='totalamount',
            field=models.IntegerField(default=0),
        ),
    ]
