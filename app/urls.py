# -*- encoding: utf-8 -*-
"""
License: MIT
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from app import views

urlpatterns = [
    # Matches any html file 
    #re_path(r'^.*\.html', views.pages, name='pages'),

    # The home page
    path('',views.index,name='home'),
    #-----------------------------------------------------------------
    # Path de las estadisticas
    #-----------------------------------------------------------------
    path('estadistica/general/',views.estadistica_general,name='estadistica_general'),
    path('estadistica/departamental/',views.estadistica_departamental,name='estadistica_departamental'),
    path('estadistica/peaje/',views.estadistica_peaje,name='estadistica_peaje'),
    #-----------------------------------------------------------------
    # Path de las tablas
    #-----------------------------------------------------------------
    path('tablas/general/',views.tablas_general,name='tablas_general'),
    path('tablas/departamental/',views.tablas_departamental,name='tablas_departamental'),
    path('tablas/peaje/',views.tablas_peaje,name='tablas_peaje'),
    #-----------------------------------------------------------------
    # Path de analisis
    #-----------------------------------------------------------------
    path('analisis/general',views.analisis_general,name='analisis_general'),
    path('analisis/ruta',views.analisis_ruta,name='analisis_ruta'),
    path('analisis/departamental',views.analisis_departamental,name='analisis_departamental'),
    path('analisis/peaje',views.analisis_peaje,name='analisis_peaje'),
    #-----------------------------------------------------------------
    # Path de reporte
    #-----------------------------------------------------------------
    path('reporte/peaje',views.reporte_peaje,name='reporte_peaje'),

    
    

    
]
