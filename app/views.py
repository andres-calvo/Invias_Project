
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
    return render(request, "Analisis_Peaje.html")


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
def reporte_peaje(request):

    if request.POST.get('action') == 'sending_option':
        choice = str(request.POST.get('choice'))
        category = "Peaje"
        startdate = request.POST.get('startdate')
        enddate = request.POST.get('enddate')
        datos = getDataFromDatabase(choice, startdate, enddate, category)

        return JsonResponse(datos)

    return render(request, "Reporte_Peaje.html")
