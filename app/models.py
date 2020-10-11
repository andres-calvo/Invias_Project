# -*- encoding: utf-8 -*-
"""
License: MIT
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Peajes (models.Model):
    peaje = models.TextField()
    codigo = models.TextField()
    pr = models.TextField()
    distancia = models.TextField()
    administra = models.TextField()
    territorial = models.TextField()
    sector = models.TextField()
    ubicacion = models.TextField()

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
    i= models.TextField(default='NO')
    ieb= models.TextField(default='NO')
    ii= models.TextField(default='NO')
    iii= models.TextField(default='NO')
    iv= models.TextField(default='NO')
    v= models.TextField(default='NO')
    eg= models.TextField(default='NO')
    er= models.TextField(default='NO')
    ea= models.TextField(default='NO')

    def __str__ (self):
        return self.fecha

class veh_San_Juan (models.Model):
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

class rec_ideal_San_Juan (models.Model):
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

class rec_San_Juan (models.Model):
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
### Santa_Ana Empieza Aqui
class veh_Santa_Ana (models.Model):
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

class rec_Santa_Ana (models.Model):
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

class rec_ideal_Santa_Ana (models.Model):
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

###Santa Ana Termina Aqui

###Gamarra
class veh_Gamarra (models.Model):
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

class rec_Gamarra (models.Model):
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

class rec_ideal_Gamarra (models.Model):
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

###Gamarra Termina
###Lobo_Guerrero Empieza Aqui
    
class veh_Lobo_Guerrero (models.Model):
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

class rec_Lobo_Guerrero (models.Model):
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

class rec_ideal_Lobo_Guerrero (models.Model):
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
        
###Lobo_Guerrero Termina Aqui


###Rincon_Hondo Empieza Aqui

class veh_Rincon_Hondo (models.Model):
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

class rec_Rincon_Hondo (models.Model):
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

class rec_ideal_Rincon_Hondo (models.Model):
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
        
###Rincon_Hondo Termina Aqui


###San_Diego Empieza Aqui

class veh_San_Diego (models.Model):
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

class rec_San_Diego (models.Model):
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

class rec_ideal_San_Diego (models.Model):
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
        
###San_Diego Termina Aqui


###Cocorna_Santuario Empieza Aqui

class veh_Cocorna_Santuario (models.Model):
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

class rec_Cocorna_Santuario (models.Model):
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

class rec_ideal_Cocorna_Santuario (models.Model):
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
        
###Cocorna_Santuario Termina Aqui


###Puerto_Triunfo Empieza Aqui

class veh_Puerto_Triunfo (models.Model):
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

class rec_Puerto_Triunfo (models.Model):
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

class rec_ideal_Puerto_Triunfo (models.Model):
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
        
###Puerto_Triunfo Termina Aqui


###Guamal Empieza Aqui

class veh_Guamal (models.Model):
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

class rec_Guamal (models.Model):
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

class rec_ideal_Guamal (models.Model):
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
        
###Guamal Termina Aqui


###Tunia Empieza Aqui

class veh_Tunia (models.Model):
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

class rec_Tunia (models.Model):
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

class rec_ideal_Tunia (models.Model):
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
        
###Tunia Termina Aqui


###Villa_Rica Empieza Aqui

class veh_Villa_Rica (models.Model):
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

class rec_Villa_Rica (models.Model):
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

class rec_ideal_Villa_Rica (models.Model):
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
        
###Villa_Rica Termina Aqui


###Cencar Empieza Aqui

class veh_Cencar (models.Model):
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

class rec_Cencar (models.Model):
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

class rec_ideal_Cencar (models.Model):
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
        
###Cencar Termina Aqui


###Cerritos Empieza Aqui

class veh_Cerritos (models.Model):
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

class rec_Cerritos (models.Model):
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

class rec_ideal_Cerritos (models.Model):
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
        
###Cerritos Termina Aqui


###Ciat Empieza Aqui

class veh_Ciat (models.Model):
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

class rec_Ciat (models.Model):
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

class rec_ideal_Ciat (models.Model):
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
        
###Ciat Termina Aqui


###Estambul Empieza Aqui

class veh_Estambul (models.Model):
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

class rec_Estambul (models.Model):
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

class rec_ideal_Estambul (models.Model):
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
        
###Estambul Termina Aqui


###Media_Canoa Empieza Aqui

class veh_Media_Canoa (models.Model):
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

class rec_Media_Canoa (models.Model):
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

class rec_ideal_Media_Canoa (models.Model):
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
        
###Media_Canoa Termina Aqui


###Paso_De_La_Torre Empieza Aqui

class veh_Paso_De_La_Torre (models.Model):
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

class rec_Paso_De_La_Torre (models.Model):
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

class rec_ideal_Paso_De_La_Torre (models.Model):
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
        
###Paso_De_La_Torre Termina Aqui


###Rozo Empieza Aqui

class veh_Rozo (models.Model):
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

class rec_Rozo (models.Model):
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

class rec_ideal_Rozo (models.Model):
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
        
###Rozo Termina Aqui


###Morrison Empieza Aqui

class veh_Morrison (models.Model):
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

class rec_Morrison (models.Model):
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

class rec_ideal_Morrison (models.Model):
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
        
###Morrison Termina Aqui


###Pailitas Empieza Aqui

class veh_Pailitas (models.Model):
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

class rec_Pailitas (models.Model):
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

class rec_ideal_Pailitas (models.Model):
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
        
###Pailitas Termina Aqui


###Platanal Empieza Aqui

class veh_Platanal (models.Model):
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

class rec_Platanal (models.Model):
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

class rec_ideal_Platanal (models.Model):
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
        
###Platanal Termina Aqui


###Aguas_Negras Empieza Aqui

class veh_Aguas_Negras (models.Model):
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

class rec_Aguas_Negras (models.Model):
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

class rec_ideal_Aguas_Negras (models.Model):
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
        
###Aguas_Negras Termina Aqui


###La_Gomez Empieza Aqui

class veh_La_Gomez (models.Model):
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

class rec_La_Gomez (models.Model):
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

class rec_ideal_La_Gomez (models.Model):
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
        
###La_Gomez Termina Aqui


###Zambito Empieza Aqui

class veh_Zambito (models.Model):
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

class rec_Zambito (models.Model):
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

class rec_ideal_Zambito (models.Model):
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
        
###Zambito Termina Aqui


###Casablanca Empieza Aqui

class veh_Casablanca (models.Model):
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

class rec_Casablanca (models.Model):
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

class rec_ideal_Casablanca (models.Model):
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
        
###Casablanca Termina Aqui


###Saboya Empieza Aqui

class veh_Saboya (models.Model):
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

class rec_Saboya (models.Model):
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

class rec_ideal_Saboya (models.Model):
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
        
###Saboya Termina Aqui


###Oiba Empieza Aqui

class veh_Oiba (models.Model):
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

class rec_Oiba (models.Model):
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

class rec_ideal_Oiba (models.Model):
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
        
###Oiba Termina Aqui


###Curm Empieza Aqui

class veh_Curm (models.Model):
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

class rec_Curm (models.Model):
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

class rec_ideal_Curm (models.Model):
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
        
###Curm Termina Aqui


###Los_Curos Empieza Aqui

class veh_Los_Curos (models.Model):
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

class rec_Los_Curos (models.Model):
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

class rec_ideal_Los_Curos (models.Model):
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
        
###Los_Curos Termina Aqui