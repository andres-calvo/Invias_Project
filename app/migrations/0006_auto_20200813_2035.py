# Generated by Django 3.0.7 on 2020-08-14 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_rec_gamarra_rec_ideal_gamarra_rec_ideal_santa_ana_rec_santa_ana_veh_gamarra_veh_santa_ana'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='recaudo',
            new_name='rec_ideal_San_Juan',
        ),
        migrations.RenameModel(
            old_name='recaudo_real',
            new_name='rec_San_Juan',
        ),
        migrations.RenameModel(
            old_name='vehiculo',
            new_name='veh_San_Juan',
        ),
    ]
