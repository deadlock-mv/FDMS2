# Generated by Django 4.1.3 on 2023-02-13 05:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorylist',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('categoryname', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Deliveryagents',
            fields=[
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('username', models.CharField(blank=True, max_length=255, null=True)),
                ('address', models.CharField(blank=True, max_length=300, null=True)),
                ('pincode', models.CharField(blank=True, max_length=10, null=True)),
                ('phone', models.CharField(blank=True, max_length=10, null=True)),
                ('agentid', models.AutoField(primary_key=True, serialize=False)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Foodorder',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(default='preparing', max_length=256)),
                ('totalamount', models.IntegerField(blank=True, null=True)),
                ('orderdate', models.DateTimeField(auto_now_add=True, null=True)),
                ('customerid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='orders', to=settings.AUTH_USER_MODEL)),
                ('delagentid', models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, to='app.deliveryagents')),
            ],
        ),
        migrations.CreateModel(
            name='Itemlist',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('itemname', models.CharField(blank=True, max_length=255, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='app.categorylist')),
            ],
        ),
        migrations.CreateModel(
            name='Orderitem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('itemid', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.itemlist')),
                ('orderid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orderitem', to='app.foodorder')),
            ],
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('orderid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='app.foodorder')),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(blank=True, max_length=300, null=True)),
                ('pincode', models.CharField(blank=True, max_length=10, null=True)),
                ('phone', models.CharField(blank=True, max_length=10, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
