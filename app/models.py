# -*- encoding: utf-8 -*-
"""
License: MIT
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tarifas (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ieb= models.IntegerField()
    ii= models.IntegerField()
    iii= models.IntegerField()
    iv= models.IntegerField()
    v= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()

    def __str__ (self):
        return self.fecha

class Exentos (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField(default='NO')
    ieb= models.IntegerField(default='NO')
    ii= models.IntegerField(default='NO')
    iii= models.IntegerField(default='NO')
    iv= models.IntegerField(default='NO')
    v= models.IntegerField(default='NO')
    eg= models.IntegerField(default='NO')
    er= models.IntegerField(default='NO')
    ea= models.IntegerField(default='NO')

    def __str__ (self):
        return self.fecha

class vehiculo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ieb= models.IntegerField()
    ii= models.IntegerField()
    iii= models.IntegerField()
    iv= models.IntegerField()
    v= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    pagaron= models.IntegerField()
    evasores= models.IntegerField()
    exentos= models.IntegerField()
    total= models.IntegerField()
    
    def __str__(self):
        return self.fecha

class recaudo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ieb= models.IntegerField()
    ii= models.IntegerField()
    iii= models.IntegerField()
    iv= models.IntegerField()
    v= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    total= models.IntegerField()
    
    def __str__(self):
        return self.fecha
