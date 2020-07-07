
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

analisis_dataset ={}
@login_required(login_url="/login/")
def index(request):
    return render(request, "index.html")


# ingresar datos 
@login_required(login_url="/login")
def ingresar_datos(request):
    
    form = vehiculoForm()
    context = {'form':form}
    if request.method == "POST":
        form = vehiculoForm(request.POST)
        if form.is_valid():
            form_entry = form.save(commit=False)
            form_entry.total = form['pagaron'] + form['exentos'] + form['evasores']
            form_entry.save()


    return render(request,"ingresar-datos.html",context)

# 

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

   


