from importlib import import_module
from datetime import datetime

def Dynamic_Import_Class(peaje):
    veh_module ='veh_'+peaje
    rec_module= 'rec_'+peaje
    rec_ideal_module = 'rec_ideal_'+peaje
    veh_class = getattr(import_module('app.models'), veh_module)
    rec_class = getattr(import_module('app.models'), rec_module)
    rec_ideal_class = getattr(import_module('app.models'), rec_ideal_module)

    return (veh_class,rec_class,rec_ideal_class)



def getDictionary():

    DptoYPeajes ={
        'Guajira': ['San_Juan'],
        'Valle_Del_Cauca': ['Lobo_Guerrero','Cencar','Cerritos','Ciat','Estambul','Media_Canoa','Paso_De_La_Torre','Rozo'],
        'Cesar': ['Rincon_Hondo','San_Diego','Gamarra','Morrison','Pailitas','Platanal'],
        'Antioquia': ['Cocorna_Santuario', 'Puerto_Triunfo'],
        'Magdalena': ['Guamal', 'Santa_Ana'],
        'Cauca': ['Tunia', 'Villa_Rica'],
        'Santander': ['Aguas_Negras','La_Gomez','Zambito','Oiba','Curm','Los_Curos'],
        'Cundinamarca': ['Casablanca'],
        'Boyaca': ['Saboya']
        }

    dias = {0:'Lunes',1:'Martes',2:'Miercoles',3:'Jueves',4:'Viernes',5:'Sabado',6:'Domingo'}
    meses ={1:'Ene',2:'Feb',3:'Mar',4:'Abr',5:'May',6:'Jun',7:'Jul',8:'Ago',9:'Sep',10:'Oct',11:'Nov',12:'Dic'}

    return (DptoYPeajes,dias,meses)

def getQuerysetsData(listofpeajes,startdate,enddate):
    fields = ['i','ieb','ii','iii','iv','v','eg','er','ea','total']
    vehiculo_data = {}
    recaudo_data = {}
    recaudo_ideal_data ={}
    _,dias,meses=getDictionary()
    for peaje_index,peaje in enumerate(listofpeajes):
        vehiculo,recaudo,recaudo_ideal= Dynamic_Import_Class(peaje)
        recaudo_data.setdefault("peajes",[]).append(peaje)
        
        veh_query_array = list(vehiculo.objects.filter(fecha__range=[startdate,enddate]).values().order_by('-fecha'))
        rec_query_array = list(recaudo.objects.filter(fecha__range=[startdate,enddate]).values().order_by('-fecha'))
        rec_ideal_query_array = list(recaudo_ideal.objects.filter(fecha__range=[startdate,enddate]).values().order_by('-fecha'))

        if peaje_index == 0:
            for array_index,value in enumerate(veh_query_array):
                for f in fields:
                    vehfield = "veh_"+f
                    vehiculo_data.setdefault(vehfield,[]).append(veh_query_array[array_index][f])

                    recfield = "rec_"+f
                    recaudo_data.setdefault(recfield,[]).append(rec_query_array[array_index][f])

                    rec_ideal_field ="rec_ideal_"+f
                    recaudo_ideal_data.setdefault(rec_ideal_field,[]).append(rec_ideal_query_array[array_index][f])

        else:
            for array_index,value in enumerate(veh_query_array):
                for f in fields:
                    vehfield = "veh_"+f
                    recfield = "rec_"+f
                    rec_ideal_field ="rec_ideal_"+f
                    vehiculo_data[vehfield][array_index] += veh_query_array[array_index][f]
                    recaudo_data[recfield][array_index] += rec_query_array[array_index][f]
                    recaudo_ideal_data[rec_ideal_field][array_index] += rec_ideal_query_array[array_index][f]

        
        aporte_total_peaje= sum(recaudo_data["rec_total"])
        print(aporte_total_peaje)
        recaudo_data.setdefault("aporte_peajes",[]).append(aporte_total_peaje)

    for value in veh_query_array:
        fecha = value['fecha']
        vehiculo_data.setdefault("fechas",[]).append(fecha)

    for date in vehiculo_data['fechas'][:-7][::-1]:
        dia_semana = dias[date.weekday()] # dias es el diccionario global declarado al inicio de este modulo
        dia_mes = str(date.day) + ' '+str(meses[date.month])
        vehiculo_data.setdefault('Rango_Semana_Vigente',[]).append(dia_mes)
        vehiculo_data.setdefault('weekdays',[]).append(dia_semana)
    
    for date in vehiculo_data['fechas'][7:][::-1]:
        dia_mes = str(date.day) + ' '+str(meses[date.month])
        vehiculo_data.setdefault('Rango_Semana_Previa',[]).append(dia_mes)
        
    final_data = {**vehiculo_data,**recaudo_data,**recaudo_ideal_data}
    # Agregando las sumas de los datos de Vehiculos Livianos
    final_data['rec_liv'] = [x + y for x, y in zip(final_data['rec_i'], final_data['rec_ieb'])]
    final_data['rec_ideal_liv'] = [x + y for x, y in zip(final_data['rec_ideal_i'], final_data['rec_ideal_ieb'])]
    final_data['veh_liv'] = [x + y for x, y in zip(final_data['veh_i'], final_data['veh_ieb'])]
    # Agregando las sumas de los datos de Vehiculos Comerciales
    final_data['rec_com'] = [x + y + z + w for x, y, z, w in zip(final_data['rec_ii'], final_data['rec_iii'],final_data['rec_iv'],final_data['rec_v'])]
    final_data['rec_ideal_com'] = [x + y + z + w for x, y, z, w in zip(final_data['rec_ideal_ii'], final_data['rec_ideal_iii'],final_data['rec_ideal_iv'],final_data['rec_ideal_v'])]
    final_data['veh_com'] = [x + y + z + w for x, y, z, w in zip(final_data['veh_ii'], final_data['veh_iii'],final_data['veh_iv'],final_data['veh_v'])]
    
    final_data['Semana_Vigente'] = final_data['rec_total'][:-7][::-1]
    final_data['Semana_Previa'] = final_data['rec_total'][7:][::-1]
    
    return final_data

def getDataFromDatabase(choice,startdate,enddate,category): # category hace referencia a General,Departamental o Peaje Especifico

    ListadePeajes = ['San_Juan','Lobo_Guerrero','Rincon_Hondo','San_Diego','Cocorna_Santuario','Puerto_Triunfo','Guamal',
    'Santa_Ana','Tunia','Villa_Rica','Cencar','Cerritos','Ciat','Estambul','Media_Canoa','Paso_De_La_Torre','Rozo','Gamarra',
    'Morrison','Pailitas','Platanal','Aguas_Negras','La_Gomez','Zambito','Casablanca','Saboya','Oiba','Curm','Los_Curos']

    DptoYPeajes,_,_ = getDictionary()
    print(category)
    if category == "Departamento":
        peajes = DptoYPeajes[choice]
        print(peajes)
        datos = getQuerysetsData(peajes,startdate,enddate)

    elif category == "General":
        peajes = ListadePeajes
        datos = getQuerysetsData(peajes, startdate, enddate)
    
    else:
        peajes = [choice]
        datos = getQuerysetsData(peajes, startdate, enddate)
    
    return datos

def GetTableData(tabletype,choice,startdate,enddate,category):
    datos_iniciales = getDataFromDatabase(choice,startdate,enddate,category)
    arrayofdicts = []
    if tabletype == "Recaudo":
        fieldtype ="rec_"
    else:
        fieldtype ="veh_"
        
    for index,elements in enumerate(datos_iniciales[fieldtype+"i"]): #La columna no importa, debido a que todas tendran la misma cantidad de datos
        valuetoappend = {}
        valuetoappend["fecha"] = datos_iniciales["fechas"][index]
        valuetoappend["i"] = datos_iniciales[fieldtype+"i"][index]
        valuetoappend["ieb"] = datos_iniciales[fieldtype+"ieb"][index]
        valuetoappend["ii"] = datos_iniciales[fieldtype+"ii"][index]
        valuetoappend["iii"] = datos_iniciales[fieldtype+"iii"][index]
        valuetoappend["iv"] = datos_iniciales[fieldtype+"iv"][index]
        valuetoappend["v"] = datos_iniciales[fieldtype+"v"][index]
        valuetoappend["eg"] = datos_iniciales[fieldtype+"eg"][index]
        valuetoappend["ea"] = datos_iniciales[fieldtype+"ea"][index]
        valuetoappend["er"] = datos_iniciales[fieldtype+"er"][index]
        valuetoappend["total"] = datos_iniciales[fieldtype+"total"][index]
        
        arrayofdicts.append(valuetoappend)
    peajes_array =datos_iniciales["peajes"]

    return (arrayofdicts,peajes_array)

      
    
    
