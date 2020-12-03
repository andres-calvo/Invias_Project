from importlib import import_module
from datetime import datetime
from app.models import Peajes

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
        'cauca': ['el_bordo'],
        'antioquia': ['los_llanos', 'taraza', 'cocorna', 'puerto_triunfo'],
        'valle_del_cauca': ['rio_frio','toro','cencar','cerrito','ciat','estambul','mediacanoa','paso_de_la_torre','rozo','villarica','tunia','loboguerrero'],
        'cundinamarca': ['bicentenario', 'casablanca'],
        'cordoba': ['carimagua'],
        'boyaca': ['arcabuco', 'el_crucero', 'sachica','saboya'],
        'nariño': ['cano', 'daza'],
        'cesar': ['platanal', 'san_diego', 'san_juan','morrison','pailitas','rincon_hondo','zambito'],
        'risaralda': ['cerritos_ii'],
        'santander': ['rio_blanco', 'oiba', 'los_curos', 'gamarra', 'la_gomez','aguas_negras'],
        'caldas': ['san_clemente']}

    dias = {0:'Lunes',1:'Martes',2:'Miercoles',3:'Jueves',4:'Viernes',5:'Sabado',6:'Domingo'}
    meses ={1:'Ene',2:'Feb',3:'Mar',4:'Abr',5:'May',6:'Jun',7:'Jul',8:'Ago',9:'Sep',10:'Oct',11:'Nov',12:'Dic'}

    return (DptoYPeajes,dias,meses)

def getQuerysetsData(listofpeajes,startdate,enddate):
    fields = ['i', 'ie', 'iee', 'ii', 'iia', 'iie', 'iiee', 'iii',
       'iiie', 'iv', 'ive', 'v', 'vab', 've', 'vi', 'vii', 'eg', 'er',
       'ea', 'ec', 'total']
    vehiculo_data = {}
    recaudo_data = {}
    recaudo_ideal_data ={}
    _,dias,meses=getDictionary()
    for peaje_index,peaje in enumerate(listofpeajes):
        vehiculo,recaudo,recaudo_ideal= Dynamic_Import_Class(peaje)
        recaudo_data.setdefault("peajes",[]).append(peaje.replace("_"," "))
        
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
    def llenarfinaldata(final_data,fields):
        # Suma de lista de lista, es decir una suma con arrays
        # Empecemos con los livianos que son las primeras tres categorias
        veh,rec,recideal=[],[],[]
        for f in fields[:3]:
            veh.append(final_data['veh_'+f])
            rec.append(final_data['rec_'+f])
            recideal.append(final_data['rec_ideal_'+f])
        final_data['veh_liv']=[sum(i) for i in zip(*veh)]
        final_data['rec_liv']=[sum(i) for i in zip(*rec)]
        final_data['rec_ideal_liv']=[sum(i) for i in zip(*recideal)]
        # Ahora con los comerciales
        veh,rec,recideal=[],[],[]
        for f in fields[3:len(fields)-5]:
            veh.append(final_data['veh_'+f])
            rec.append(final_data['rec_'+f])
            recideal.append(final_data['rec_ideal_'+f])
        final_data['veh_com']=[sum(i) for i in zip(*veh)]
        final_data['rec_com']=[sum(i) for i in zip(*rec)]
        final_data['rec_ideal_com']=[sum(i) for i in zip(*recideal)]

        return final_data

    final_data= llenarfinaldata(final_data,fields)
            
    
    final_data['Semana_Vigente'] = final_data['rec_total'][:-7][::-1]
    final_data['Semana_Previa'] = final_data['rec_total'][7:][::-1]
    final_data['categorias']=fields

    # Obtener las tres mejores categorias para el grafico de Torta de la pagina Estadistica
    campos=fields[0:len(fields)-5] # Seleccionar las categorias excepto los ejes y el total
    values=[]

    for field in campos:
        values.append(sum(final_data['veh_'+field][-7:]))

    tuplas=sorted(zip(values,campos),reverse=True)# Tuplas con valores y categorias
    top3=[]
    otros=[0,'Otros']

    for index,item in enumerate(tuplas):
        if index < 3:
            top3.append(item)
        else:
            otros[0]+= item[0]
    
    final_data['PieChartData']=top3 + otros #uniendo las listas en una lista final
    
    return final_data

def getDataFromDatabase(choice,startdate,enddate,category): # category hace referencia a General,Departamental o Peaje Especifico

    ListadePeajes = ['aguas_negras','arcabuco','bicentenario','cano','carimagua','casablanca','cencar',
    'cerrito','cerritos_ii','ciat','cocorna','daza','el_bordo','el_crucero','estambul','gamarra','la_gomez',
    'loboguerrero','los_curos','los_llanos','mediacanoa','morrison','oiba','pailitas','paso_de_la_torre','platanal','puerto_triunfo',
    'rincon_hondo','rio_blanco','rio_frio','rozo','saboya','sachica','san_clemente','san_diego','san_juan','taraza','toro','tunia',
    'villarica','zambito']

    DptoYPeajes,_,_ = getDictionary()
    print(category)
    if category == "Departamento":
        peajes = DptoYPeajes[choice]
        print(peajes)
        datos = getQuerysetsData(peajes,startdate,enddate)

    elif category == "General":
        peajes = ListadePeajes
        datos = getQuerysetsData(peajes, startdate, enddate)
         
    
    elif category == "Ruta":
        query=Peajes.objects.filter(codigo_via__startswith=choice).values() ## choice sera la ruta escogida tener en cuenta que son los dos primeros numeros del codigo
        peajes=[]
        for p in query:
            peajes.append(p['peaje'].lower().replace(' ','_'))

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
    categorias = datos_iniciales['categorias']   
    for index in range(len(datos_iniciales['fechas'])): #La cantidad de fechas indicara el numero de datos maximo
        valuetoappend = {}
        valuetoappend["fechas"] = datos_iniciales["fechas"][index]
        for cat in categorias:
            valuetoappend[cat] = '{0:,}'.format(datos_iniciales[fieldtype+cat][index])
        
        
        arrayofdicts.append(valuetoappend)
    peajes_array =datos_iniciales["peajes"]

    return (arrayofdicts,peajes_array)

      
    
    
