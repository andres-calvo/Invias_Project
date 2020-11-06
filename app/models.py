
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

class veh_aguas_negras (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_aguas_negras (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_arcabuco (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_arcabuco (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_bicentenario (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_bicentenario (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_cano (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_cano (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_carimagua (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_carimagua (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_casablanca (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_casablanca (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_cencar (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_cencar (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_cerrito (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_cerrito (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_cerritos_ii (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_cerritos_ii (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_ciat (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_ciat (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_cocorna (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_cocorna (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_daza (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_daza (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_el_bordo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_el_bordo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_el_crucero (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_el_crucero (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_estambul (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_estambul (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_gamarra (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_gamarra (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_la_gomez (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_la_gomez (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_loboguerrero (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_loboguerrero (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_los_curos (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_los_curos (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_los_llanos (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_los_llanos (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_mediacanoa (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_mediacanoa (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_morrison (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_morrison (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_oiba (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_oiba (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_pailitas (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_pailitas (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_paso_de_la_torre (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_paso_de_la_torre (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_platanal (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_platanal (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_puerto_triunfo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_puerto_triunfo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_rincon_hondo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_rincon_hondo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_rio_blanco (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_rio_blanco (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_rio_frio (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_rio_frio (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_rozo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_rozo (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_saboya (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_saboya (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_sachica (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_sachica (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_san_clemente (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_san_clemente (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_san_diego (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_san_diego (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_san_juan (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_san_juan (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_taraza (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_taraza (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_toro (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_toro (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_tunia (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_tunia (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_villarica (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_villarica (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class veh_zambito (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
        
class rec_zambito (models.Model):
    fecha= models.DateField(primary_key = True)
    i= models.IntegerField()
    ie= models.IntegerField()
    iee= models.IntegerField()
    ii= models.IntegerField()
    iia= models.IntegerField()
    iie= models.IntegerField()
    iiee= models.IntegerField()
    iii= models.IntegerField()
    iiie= models.IntegerField()
    iv= models.IntegerField()
    ive= models.IntegerField()
    v= models.IntegerField()
    vab= models.IntegerField()
    eg= models.IntegerField()
    er= models.IntegerField()
    ea= models.IntegerField()
    ec= models.IntegerField()
    total= models.IntegerField()

    def __str__(self):
        return self.fecha
                