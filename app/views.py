
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from django.http import JsonResponse
from .models import veh_San_Juan,rec_ideal_San_Juan,Exentos,rec_San_Juan
#Importlib is to dynamic importing modules with strings its very important
import importlib

from datetime import datetime
import json
import base64
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage

#-------------------------------------------
# Home
# ------------------------------------------ 
@login_required(login_url="/login/")
def index(request):
    return render (request,"Estadistica_Peaje.html")
#-------------------------------------------
# Estadisticas
# ------------------------------------------ 
@login_required(login_url="/login/")
def estadistica_general(request):
    return render (request,"Estadistica_General.html")

@login_required(login_url="/login/")
def estadistica_departamental(request):
    return render (request,"Estadistica_Departamental.html")

@login_required(login_url="/login/")
def estadistica_peaje(request):
    return render (request,"Estadistica_Peaje.html")

@login_required(login_url="/login/")
def index_data(request):
    rec = list(rec_San_Juan.objects.values().order_by('-fecha')[:14])
    veh = veh_San_Juan.objects.values().order_by('-fecha')[:14]
    dias = {0:'Lunes',1:'Martes',2:'Miercoles',3:'Jueves',4:'Viernes',5:'Sabado',6:'Domingo'}
    datos = {}
    
    for entry in rec[:7]:
        value_liv = entry['i'] + entry['ieb']
        datos.setdefault('rec_liv',[]).append(value_liv)
        a = dias[entry['fecha'].weekday()]
        datos.setdefault('fechas',[]).append(a)
        datos.setdefault('Semana_Vigente',[]).append(entry['total'])
        
    for entry in veh[:7]:
        value_liv = entry['i'] + entry['ieb']
        value_com = entry['ii'] + entry['iii'] + entry['iv'] + entry['v']
        datos.setdefault('veh_liv',[]).append(value_liv)
        datos.setdefault('veh_com',[]).append(value_com)
        datos.setdefault('veh_total',[]).append(entry['total'])
    
    for entry in veh:
        datos.setdefault('pie_I',[]).append(entry['i'])
        datos.setdefault('pie_IEB',[]).append(entry['ieb'])
        datos.setdefault('pie_II',[]).append(entry['ii'])
        datos.setdefault('pie_III',[]).append(entry['iii'])
        datos.setdefault('pie_IV',[]).append(entry['iv'])
        datos.setdefault('pie_V',[]).append(entry['v'])
    
    for entry in rec[7:14][::-1]:
        datos.setdefault('Semana_Previa',[]).append(entry['total'])
    
   
    return JsonResponse(datos)


#-------------------------------------------
# Analisis
# ------------------------------------------
@login_required(login_url= "/login")
def analisis_general(request):
    return render (request,"Analisis_General.html") 

@login_required(login_url= "/login")
def analisis_departamental(request):
    return render(request,"Analisis_Departamental.html")

@login_required(login_url= "/login")
def analisis_peaje(request):
    datos={}
    if request.POST.get('action') == 'post':
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        fields = ['i','ieb','ii','iii','iv','v','eg','er','ea']
        rec_ideal_query = recaudo.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
        rec_real_query =rec_San_Juan.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
        veh_query = veh_San_Juan.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
        fecha_query =veh_San_Juan.objects.filter(fecha__range=[startdate,enddate]).values('fecha').order_by('fecha')
        
        for field in fields:
            for entry in rec_ideal_query:
                datos.setdefault('rec_ideal_'+field,[]).append(entry[field])
            for entry in rec_real_query:
                datos.setdefault('rec_real_'+field,[]).append(entry[field])
            for entry in veh_query:
                datos.setdefault('veh_'+field,[]).append(entry[field])
        for entry in fecha_query:
            datos.setdefault('fechas',[]).append(entry['fecha'])

        
        return JsonResponse(datos,safe=False)
    return render(request,"analisis.html")



#-------------------------------------------
# Tablas
# ------------------------------------------ 
@login_required(login_url="/login")
def tablas_general(request):
    return render(request,"Tablas_General.html")
    
@login_required(login_url="/login")
def tablas_departamental(request):
    return render(request,"Tablas_Departamental.html")

@login_required(login_url="/login")
def tablas_peaje(request):
    fields = ['fecha','i','ieb','ii','iii','iv','v','eg','ea','er','total']
    print('Aqui voys')
    if request.POST.get('action') == 'post':
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        if request.POST.get('radiovalue') == 'Recaudo':
            query = rec_San_Juan.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
            for entry in query:
                #Converting date objects into strings format(yyyy-mm-dd)
                entry['fecha'] = entry['fecha'].strftime('%Y-%m-%d')
            table_data= {"data": list(query)}
            
            return JsonResponse(table_data,safe=False)
            
        else:
            query = veh_San_Juan.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
            for entry in query:
                #Converting date objects into strings format(yyyy-mm-dd)
                entry['fecha'] = entry['fecha'].strftime('%Y-%m-%d')
            table_data= {"data": list(query)}
            
            return JsonResponse(table_data,safe=False)
        
    
    return render (request,"tablas.html",)



#-------------------------------------------
# Reporte
# ------------------------------------------ 
@login_required(login_url="/login/")
def reporte_general(request):
    return render(request,"Reporte_General.html")

@login_required(login_url="/login/")
def reporte_departamental(request):
    return render(request,"Reporte_Departamental.html")

@login_required(login_url="/login/")
def reporte_peaje(request):
    
    if request.POST.get('action') == 'post':
        
        startdate= request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        fields = ['i','ieb','ii','iii','iv','v','eg','ea','er']
        print(startdate,enddate)
        datos = {}

        veh = veh_San_Juan.objects.filter(fecha__range = [startdate,enddate]).values(*fields).order_by('fecha')
        rec = rec_San_Juan.objects.filter(fecha__range = [startdate,enddate]).values(*fields).order_by('fecha')
        fechas = veh_San_Juan.objects.filter(fecha__range = [startdate,enddate]).values('fecha').order_by('fecha')
        datos['startdate']=startdate
        datos['enddate']=enddate
        datos['contratista']= request.POST.get('contratista')
        datos['e_peaje']= request.POST.get('e_peaje')
        datos['ruta']= request.POST.get('ruta')
        datos['sector'] = request.POST.get('sector')
        datos['localizacion']= request.POST.get('localizacion')
        datos['departamento']= request.POST.get('departamento')
        datos['num_contrato'] = request.POST.get('num_contrato')
        datos['novedades']= request.POST.get('novedades')
        for entry in veh:
            for f in fields :
                 datos.setdefault('veh_'+f,[]).append(entry[f])

        for entry in rec:
            for f in fields:
                datos.setdefault('rec_'+f,[]).append(entry[f])

        for entry in fechas:
            datos.setdefault('fechas',[]).append(entry['fecha'])

        #Calcular totales
        for f in fields:
            datos['Total_Veh_'+f] = sum(datos['veh_'+f])
            datos['Total_Rec_'+f] = sum(datos['rec_'+f])
        
        datos['Total_vehiculo']= datos['veh_i']+datos['veh_ieb']+datos['veh_ii']+datos['veh_iii']+datos['veh_iv']+datos['veh_v']
        datos['Total_recaudo_real']= datos['rec_i']+datos['rec_ieb']+datos['rec_ii']+datos['rec_iii']+datos['rec_iv']+datos['rec_v']+datos['rec_eg']+datos['rec_er']+datos['rec_ea']
           
        return JsonResponse(datos)

    return render (request,"reporte.html")

   


