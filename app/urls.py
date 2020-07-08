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
    path('', views.index,name='home'),
    path('index-data',views.index_data),
    path('ingresar-datos.html',views.ingresar_datos),
    path('analisis.html',views.analisis_page),
    path('tablas.html',views.tablas_page),
    path('reporte.html',views.reporte_page),
    

    
]
