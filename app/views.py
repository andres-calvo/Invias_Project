
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from django.http import JsonResponse

# Importlib is to dynamic importing modules with strings its very important

from modules.class_importer import getDataFromDatabase, getDictionary, getQuerysetsData, GetTableData
import json
import base64
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage

# -------------------------------------------
# Home
# ------------------------------------------


@login_required(login_url="/login/")
def index(request):
    return redirect("/estadistica/general")
# -------------------------------------------
# Estadisticas
# ------------------------------------------


@login_required(login_url="/login/")
def estadistica_general(request):
    if request.POST.get('action') == 'sending_option':
        category = "General"
        startdate = '2020-02-16'
        enddate = '2020-02-29'
        datos = getDataFromDatabase("General", startdate, enddate, category)

        return JsonResponse(datos)

    return render(request, "Estadistica.html")


@login_required(login_url="/login/")
def estadistica_departamental(request):
    if request.POST.get('action') == 'sending_option':
        departamento = str(request.POST.get('choice'))
        category = "Departamento"
        startdate = '2020-02-16'
        enddate = '2020-02-29'
        datos = getDataFromDatabase(departamento, startdate, enddate, category)

        return JsonResponse(datos)
    return render(request, "Estadistica.html")


@login_required(login_url="/login/")
def estadistica_peaje(request):
    if request.POST.get('action') == 'sending_option':
        choice = str(request.POST.get('choice'))
        category = "Peaje"
        startdate = '2020-02-16'
        enddate = '2020-02-29'
        datos = getDataFromDatabase(choice, startdate, enddate, category)

        return JsonResponse(datos)

    return render(request, "Estadistica.html")



# -------------------------------------------
# Analisis
# ------------------------------------------
@login_required(login_url="/login")
def analisis_general(request):
    if request.POST.get('action') == 'sending_option':
        choice = str(request.POST.get('choice'))
        category = "General"
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        datos = getDataFromDatabase(choice, startdate, enddate, category)

        return JsonResponse(datos)
    return render(request, "Analisis_General_Departamental.html")


@login_required(login_url="/login")
def analisis_departamental(request):
    if request.POST.get('action') == 'sending_option':
        choice = str(request.POST.get('choice'))
        category = "Departamento"
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        datos = getDataFromDatabase(choice, startdate, enddate, category)

        return JsonResponse(datos)
    return render(request, "Analisis_General_Departamental.html")


@login_required(login_url="/login")
def analisis_peaje(request):
    if request.POST.get('action') == 'sending_option':
        choice = str(request.POST.get('choice'))
        category = "Peaje"
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        datos = getDataFromDatabase(choice, startdate, enddate, category)

        return JsonResponse(datos)
    return render(request, "analisis.html")


# -------------------------------------------
# Tablas
# ------------------------------------------
@login_required(login_url="/login")
def tablas_general(request):
    if request.POST.get("action") == "post":
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        tabletype = request.POST.get('radiovalue')
        choice = str(request.POST.get('choice'))
        category = "General"
        Tabledata = {"data": GetTableData(
            tabletype, choice, startdate, enddate, category)}

        return JsonResponse(Tabledata)

    return render(request, "Tablas.html")


@login_required(login_url="/login")
def tablas_departamental(request):
    if request.POST.get("action") == "post":
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        tabletype = request.POST.get('radiovalue')
        choice = request.POST.get('choice')
        category = "Departamento"
        Tabledata = {"data": GetTableData(
            tabletype, choice, startdate, enddate, category)}

        return JsonResponse(Tabledata)

    return render(request, "Tablas.html")


@login_required(login_url="/login")
def tablas_peaje(request):
    if request.POST.get("action") == "post":
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        tabletype = request.POST.get('radiovalue')
        choice = str(request.POST.get('choice'))
        category = "Peaje"
        Tabledata = {"data": GetTableData(
            tabletype, choice, startdate, enddate, category)}
        return JsonResponse(Tabledata)

    return render(request, "Tablas.html")


# -------------------------------------------
# Reporte
# ------------------------------------------
@login_required(login_url="/login/")
def reporte_general(request):
    return render(request, "Reporte_General.html")


@login_required(login_url="/login/")
def reporte_departamental(request):
    return render(request, "Reporte_Departamental.html")


@login_required(login_url="/login/")
def reporte_peaje(request):

    # if request.POST.get('action') == 'post':

    #     startdate= request.POST.get('startdate')
    #     enddate = request.POST.get('enddate')
    #     fields = ['i','ieb','ii','iii','iv','v','eg','ea','er']
    #     print(startdate,enddate)
    #     datos = {}

    #     veh = veh_San_Juan.objects.filter(fecha__range = [startdate,enddate]).values(*fields).order_by('fecha')
    #     rec = rec_San_Juan.objects.filter(fecha__range = [startdate,enddate]).values(*fields).order_by('fecha')
    #     fechas = veh_San_Juan.objects.filter(fecha__range = [startdate,enddate]).values('fecha').order_by('fecha')
    #     datos['startdate']=startdate
    #     datos['enddate']=enddate
    #     datos['contratista']= request.POST.get('contratista')
    #     datos['e_peaje']= request.POST.get('e_peaje')
    #     datos['ruta']= request.POST.get('ruta')
    #     datos['sector'] = request.POST.get('sector')
    #     datos['localizacion']= request.POST.get('localizacion')
    #     datos['departamento']= request.POST.get('departamento')
    #     datos['num_contrato'] = request.POST.get('num_contrato')
    #     datos['novedades']= request.POST.get('novedades')
    #     for entry in veh:
    #         for f in fields :
    #              datos.setdefault('veh_'+f,[]).append(entry[f])

    #     for entry in rec:
    #         for f in fields:
    #             datos.setdefault('rec_'+f,[]).append(entry[f])

    #     for entry in fechas:
    #         datos.setdefault('fechas',[]).append(entry['fecha'])

    #     #Calcular totales
    #     for f in fields:
    #         datos['Total_Veh_'+f] = sum(datos['veh_'+f])
    #         datos['Total_Rec_'+f] = sum(datos['rec_'+f])

    #     datos['Total_vehiculo']= datos['veh_i']+datos['veh_ieb']+datos['veh_ii']+datos['veh_iii']+datos['veh_iv']+datos['veh_v']
    #     datos['Total_recaudo_real']= datos['rec_i']+datos['rec_ieb']+datos['rec_ii']+datos['rec_iii']+datos['rec_iv']+datos['rec_v']+datos['rec_eg']+datos['rec_er']+datos['rec_ea']

    #     return JsonResponse(datos)

    return render(request, "reporte.html")
