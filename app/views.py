
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from django.http import JsonResponse
from .models import vehiculo,recaudo
from .forms import vehiculoForm,analisisDate,tableForm,reporteForm
from datetime import datetime
import json


@login_required(login_url="/login/")
def index(request):
    return render(request, "index.html")

@login_required(login_url="/login/")
def index_data(request):
    rec = list(recaudo.objects.values().order_by('-fecha')[:14])
    veh = vehiculo.objects.values().order_by('-fecha')[:7]
    dias = {0:'Lunes',1:'Martes',2:'Miercoles',3:'Jueves',4:'Viernes',5:'Sabado',6:'Domingo'}
    datos = {}
    
    for entry in rec[:7]:
        value_liv = entry['i'] + entry['ieb']
        datos.setdefault('rec_liv',[]).append(value_liv)
        a = dias[entry['fecha'].weekday()]
        datos.setdefault('fechas',[]).append(a)
        datos.setdefault('Semana_Vigente',[]).append(entry['total'])
        
    for entry in veh:
        value_liv = entry['i'] + entry['ieb']
        value_com = entry['ii'] + entry['iii'] + entry['iv'] + entry['v']
        datos.setdefault('veh_liv',[]).append(value_liv)
        datos.setdefault('veh_com',[]).append(value_com)
        datos.setdefault('veh_total',[]).append(entry['total'])
    
    for entry in rec[7:14][::-1]:
        datos.setdefault('Semana_Previa',[]).append(entry['total'])
    
    print(datos)
    return JsonResponse(datos)


# ingresar datos 
@login_required(login_url="/login")
def ingresar_datos(request):
    tarifas = {'I':1000,'IEB':2000,'II':3000,'III':4000,'IV':5000,'V':6000,'EG':7000,'ER':8000,'EA':9000}
    vehiculos = {}
    aporte = {}
    print('Aqui estoy')
    if request.POST.get('action') == 'post':
        print('Aqui sigo')
        exentos = request.POST.getlist('exentos[]')
        fecha = request.POST.get('fecha')
        vehiculos['I'] = int(request.POST.get('I'))
        vehiculos['IEB'] = int(request.POST.get('IEB'))
        vehiculos['II'] = int(request.POST.get('II'))
        vehiculos['III'] = int(request.POST.get('III'))
        vehiculos['IV'] = int(request.POST.get('IV'))
        vehiculos['V'] = int(request.POST.get('V'))
        vehiculos['EG'] = int(request.POST.get('EG'))
        vehiculos['ER'] = int(request.POST.get('ER'))
        vehiculos['EA'] = int(request.POST.get('EA'))
        veh_total = vehiculos['I'] + vehiculos['IEB'] + vehiculos['II'] + vehiculos['III'] + vehiculos['IV'] + vehiculos['V']
        for key in tarifas.keys():
            
            aporte['aporte_'+key] = vehiculos[key] * tarifas[key]
            
            for key_exento in exentos:
                if(key_exento == key):
                    aporte['aporte_'+key] =0
                
        
        aporte_total = sum(aporte.values())
        datos ={**aporte,**vehiculos,'fecha':fecha,'veh_total':veh_total,'aporte_total':aporte_total}
        return JsonResponse(datos)

    return render(request,"ingresar-datos.html")



# Analisis grafico de los datos
@login_required(login_url= "/login")
def analisis_page(request):
    dateform = analisisDate()
    context = {'dateform':dateform}
    if request.method == "POST":
        dateform = analisisDate(request.POST)
        if dateform.is_valid():
            print(dateform['startdate'])
            print(dateform.enddate)
            print(dateform.categorias)
            print(dateform.dataChose)
    return render(request,"analisis.html",context)

@login_required(login_url="/login")
def tablas_page(request):
    fields = ['fecha','i','ieb','ii','iii','iv','v','eg','ea','er','total']
    print('Aqui voys')
    if request.POST.get('action') == 'post':
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        if request.POST.get('radiovalue') == 'Recaudo':
            query = recaudo.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
            for entry in query:
                #Converting date objects into strings format(yyyy-mm-dd)
                entry['fecha'] = entry['fecha'].strftime('%Y-%m-%d')
            table_data= {"data": list(query)}
            
            return JsonResponse(table_data,safe=False)
            
        else:
            query = vehiculo.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
            for entry in query:
                #Converting date objects into strings format(yyyy-mm-dd)
                entry['fecha'] = entry['fecha'].strftime('%Y-%m-%d')
            table_data= {"data": list(query)}
            
            return JsonResponse(table_data,safe=False)
        
    
    return render (request,"tablas.html",)

@login_required(login_url="/login/")
def reporte_page(request):
    form = reporteForm()
    context = {'form': form}
    if request.POST.get('action') == 'post':
        
        startdate= request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        fields = ['i','ieb','ii','iii','iv','v','eg','ea','er']
        print(startdate,enddate)
        datos = {}

        veh = vehiculo.objects.filter(fecha__range = [startdate,enddate]).values(*fields).order_by('fecha')
        rec = recaudo.objects.filter(fecha__range = [startdate,enddate]).values(*fields).order_by('fecha')
        fechas = vehiculo.objects.filter(fecha__range = [startdate,enddate]).values('fecha').order_by('fecha')
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
            
        return JsonResponse(datos)
    
    return render (request,"reporte.html",context)

   


