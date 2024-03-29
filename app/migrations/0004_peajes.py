# Generated by Django 3.0.7 on 2020-11-22 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_delete_peajes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Peajes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('longitud', models.TextField()),
                ('latitud', models.TextField()),
                ('codigo_via', models.TextField()),
                ('pr', models.TextField()),
                ('distancia', models.TextField()),
                ('peaje', models.TextField()),
                ('departamento', models.TextField()),
                ('sentido', models.TextField()),
                ('ubicacion', models.TextField()),
                ('i', models.IntegerField()),
                ('ie', models.IntegerField()),
                ('iee', models.IntegerField()),
                ('ii', models.IntegerField()),
                ('iia', models.IntegerField()),
                ('iie', models.IntegerField()),
                ('iiee', models.IntegerField()),
                ('iii', models.IntegerField()),
                ('iiie', models.IntegerField()),
                ('iv', models.IntegerField()),
                ('ive', models.IntegerField()),
                ('v', models.IntegerField()),
                ('vab', models.IntegerField()),
                ('ve', models.IntegerField()),
                ('vi', models.IntegerField()),
                ('vii', models.IntegerField()),
                ('eg', models.IntegerField()),
                ('er', models.IntegerField()),
                ('ea', models.IntegerField()),
                ('ec', models.IntegerField()),
            ],
        ),
    ]
