# Generated by Django 3.0.7 on 2021-01-07 04:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('home', '0003_auto_20201224_0144'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('sent_by', models.CharField(max_length=20)),
                ('sent_dt', models.DateTimeField(auto_now_add=True)),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Classroom')),
            ],
            options={
                'verbose_name_plural': 'Chat',
            },
        ),
    ]
