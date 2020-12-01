from importlib import import_module
from datetime import datetime,timedelta,date
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
    _,dias,meses=getDictionary()
    # Estructura Base del diccionario
    # Esta estructura es importante para corroborar la fidelidad de las operaciones
    # todos los campos estaran seteados a cero, y las nuevas keys corresponderan a las fechas 
    
    estructura = {f:0 for f in fields}
    
    def rangofechas(start,end):
        for n in range(int((end-start).days)+1):
            yield start + timedelta(n)
    start = datetime.strptime(startdate,'%Y-%m-%d')
    end = datetime.strptime(enddate,'%Y-%m-%d')
    fechas = [dt for dt in rangofechas(start,end)] #.strftime("%Y-%m-%d")
    basedict = {
        'vehiculos':{fecha:estructura for fecha in fechas},
        'recaudo':{fecha:estructura for fecha in fechas},
        'recaudo_ideal':{fecha:estructura for fecha in fechas}
    } # Esto asegura que tengamos la cantidad de fechas solicitadas

    def reestructurarQueryset(query,fields):
        data={}
        for row in query:
            data[row['fecha']]={key:row[key] for key in fields}

        return data

    
    for peaje_index,peaje in enumerate(listofpeajes):
        print('Estas en ',peaje)
        vehiculo,recaudo,recaudo_ideal= Dynamic_Import_Class(peaje)
        basedict.setdefault("peajes",[]).append(peaje.replace("_"," "))
        
        veh_query_array = list(vehiculo.objects.filter(fecha__range=[startdate,enddate]).values().order_by('-fecha'))
        rec_query_array = list(recaudo.objects.filter(fecha__range=[startdate,enddate]).values().order_by('-fecha'))
        rec_ideal_query_array = list(recaudo_ideal.objects.filter(fecha__range=[startdate,enddate]).values().order_by('-fecha'))

        # Ahora reorganizaremos la Queryset con la estructura definida en "basedict" que corresponde a fecha:{field:0 for field in fields }
        vehiculos_dict=reestructurarQueryset(veh_query_array,fields)
        recaudo_dict= reestructurarQueryset(rec_query_array,fields)
        recaudo_ideal_dict =reestructurarQueryset(rec_ideal_query_array,fields)

        #Iterar sobre las fechas solicitadas
        for fecha in fechas:
            if fecha in list(vehiculos_dict.keys()):# No importa si es vehiculo o recaudo o el ideal, debido a que todos tienen la misma cantidad de fechas
                for field in fields:
                    basedict['vehiculos'][fecha][field] +=vehiculos_dict[fecha][field]
                    basedict['recaudo'][fecha][field] += recaudo_dict[fecha][field]
                    basedict['recaudo_ideal'][fecha][field] += recaudo_ideal_dict[fecha][field]
    # Termina la iteracion de datos

    #Empieza la reorganizacion final en listas, esto es debido a que la mayoria de plugins como ChartJS piden los datos en un array
    # Sera reorganizado de la siguiente forma vehiculos[field]= [0,1,2 ....]

    main_dict= {}
    for fecha in fechas:
        for f in fields:
            main_dict.setdefault('veh_'+f,[]).append(basedict['vehiculos'][fecha][f])
            main_dict.setdefault('rec_'+f,[]).append(basedict['recaudo'][fecha][f])
            main_dict.setdefault('rec_ideal_'+f,[]).append(basedict['recaudo_ideal'][fecha][f])
    main_dict['fechas']=fechas
    main_dict['peajes']=basedict['peajes']


        # # if peaje_index == 0:
        # for array_index,value in enumerate(veh_query_array):
        #     for f in fields:
        #         vehfield = "veh_"+f
        #         vehiculo_data.setdefault(vehfield,[0]).append(veh_query_array[array_index][f])

        #         recfield = "rec_"+f
        #         recaudo_data.setdefault(recfield,[0]).append(rec_query_array[array_index][f])

        #         rec_ideal_field ="rec_ideal_"+f    
        #         recaudo_ideal_data.setdefault(rec_ideal_field,[0]).append(rec_ideal_query_array[array_index][f])

        # else:
        #     for array_index,value in enumerate(veh_query_array):
        #         for f in fields:
        #             vehfield = "veh_"+f
        #             recfield = "rec_"+f
        #             rec_ideal_field ="rec_ideal_"+f
        #             vehiculo_data[vehfield][array_index] += veh_query_array[array_index][f]
        #             recaudo_data[recfield][array_index] += rec_query_array[array_index][f]
        #             recaudo_ideal_data[rec_ideal_field][array_index] += rec_ideal_query_array[array_index][f]

        

    # for value in veh_query_array:
    #     fecha = value['fecha']
    #     vehiculo_data.setdefault("fechas",[]).append(fecha)

    for date in main_dict['fechas'][:-7][::-1]:
        dia_semana = dias[date.weekday()] # dias es el diccionario global declarado al inicio de este modulo
        dia_mes = str(date.day) + ' '+str(meses[date.month])
        main_dict.setdefault('Rango_Semana_Vigente',[]).append(dia_mes)
        main_dict.setdefault('weekdays',[]).append(dia_semana)
    
    for date in main_dict['fechas'][7:][::-1]:
        dia_mes = str(date.day) + ' '+str(meses[date.month])
        main_dict.setdefault('Rango_Semana_Previa',[]).append(dia_mes)
        
    # final_data = {**vehiculo_data,**recaudo_data,**recaudo_ideal_data}
    # Crear las listas para las list comprehension
    def llenarfinaldata(main_dict,fields):
        # Suma de lista de lista, es decir una suma con arrays
        # Empecemos con los livianos que son las primeras tres categorias
        veh,rec,recideal=[],[],[]
        for f in fields[:3]:
            veh.append(main_dict['veh_'+f])
            rec.append(main_dict['rec_'+f])
            recideal.append(main_dict['rec_ideal_'+f])
        main_dict['veh_liv']=[sum(i) for i in zip(*veh)]
        main_dict['rec_liv']=[sum(i) for i in zip(*rec)]
        main_dict['rec_ideal_liv']=[sum(i) for i in zip(*recideal)]
        # Ahora con los comerciales
        veh,rec,recideal=[],[],[]
        for f in fields[3:len(fields)-5]:
            veh.append(main_dict['veh_'+f])
            rec.append(main_dict['rec_'+f])
            recideal.append(main_dict['rec_ideal_'+f])
        main_dict['veh_com']=[sum(i) for i in zip(*veh)]
        main_dict['rec_com']=[sum(i) for i in zip(*rec)]
        main_dict['rec_ideal_com']=[sum(i) for i in zip(*recideal)]

        return main_dict

    main_dict= llenarfinaldata(main_dict,fields)
            
    
    main_dict['Semana_Vigente'] = main_dict['rec_total'][:-7][::-1]
    main_dict['Semana_Previa'] = main_dict['rec_total'][7:][::-1]
    main_dict['categorias']=fields

    # Obtener las tres mejores categorias para el grafico de Torta de la pagina Estadistica
    campos=fields[0:len(fields)-5] # Seleccionar las categorias excepto los ejes y el total
    values=[]

    for field in campos:
        values.append(sum(main_dict['veh_'+field][-7:]))

    tuplas=sorted(zip(values,campos),reverse=True)# Tuplas con valores y categorias
    top3=[]
    otros=[0,'Otros']

    for index,item in enumerate(tuplas):
        if index < 3:
            top3.append(item)
        else:
            otros[0]+= item[0]
    
    main_dict['PieChartData']=top3 + otros #uniendo las listas en una lista final

    
    return main_dict

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
            peajes.append(p['peaje'])

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

# def GetMapData(choice,category):
#     datos={}
#     if category =="General":
#         #get todos los puntos
#         Peajes.objects.values(['peaje','latitud','longitud','departamento','codigo_via'])
#     elif category =="Departamento":
#         #get los peajes en choice
#         pass
#     else :
#         print("Categoria No permitida, Permitidas: General o Departamento")
         
    
    
